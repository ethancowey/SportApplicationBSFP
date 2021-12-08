/**
 * Server which listens for requests from the user to perform a various amount of tasks depending on the route of
 * the request. More information on each routes functionality can be found above their app.post in this file and
 * for specifics on the inner workings of all the functions used can be found in /components file and the mongo schemas
 * in the /mongoDrivers file
 */
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cluster = require('cluster');

const register = require('./components/register')
const getUser = require('./components/getUser')
const login = require('./components/login')
const post = require('./components/addPost')
const getPosts = require('./components/getPost')
const speedGenerator = require('./components/speed')
const calorieGenerator = require('./components/calories')
const postRanker = require('./components/postRanker')
const serverFilter = require('./components/serverFilter')
const UserPosts = require('./mongoDrivers/userPosts')


if (cluster.isMaster) {

    // Count the machine's CPUs
    const cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

// Code to run if we're in a worker process
} else {

    app.use(bodyParser.json())
    app.use(cors());
    /** /login authenticates user logins by calling the loginUser function from login.js and responds with the result this
     * involves bcrypt hashing
     */
    app.post('/login', async (req, res) => {
        const auth = await login.loginUser({ username: req.body.username }, req.body.password)
        console.log(auth);
        if (auth === false) {
            res.send({
                verified: 'no'
            });
        } else {
            res.send({
                verified: 'yes'
            });
        }
    });
    /**
     * /register Firstly it checks if the username sent to make a new account with is unique using getUser.js
     * If its not unique it will respond to the client to choose another username.
     * If it is unique it will then register it to the database using register.js and hashses the password so its not stored
     * in plaintext.
     * It will then respond the user has been added.
     */
    app.post('/register', async (req, res) => {
        // check username is unique
        const unique = await getUser.getUsername(req.body.username); // if returns null username is unique
        console.log(unique);
        if (unique != null) {
            res.send({
                verified: 'no'
            })
        } else {
            // Compute a bcrypt hash of the password to be stored in the database
            const hashPass = bcrypt.hashSync(req.body.password);
            console.log(hashPass);
            const registered = await register.registerUser({
                username: req.body.username,
                password: hashPass,
                weight: req.body.weight,
                favouriteSport: req.body.favouriteSport
            });
            console.log(registered);
            res.send({
                verified: 'yes'
            });
        }
    });
    /**
     * /post Firstly will retrieve the users weight using getUser.js to help calculate statistics.
     * Secondly users speed in mph and kph is calculated using speed.js
     * Next users calories burnt using weight, speed and intensity is calculated using calories.js
     * Then the users input is checked by serverFilter.js for malicious input
     * If no bad input is found its added to the database using addPost.js
     */
    app.post('/post', async (req, res) => {
        console.log(req.body.username);

        // get the users weight
        const userData = await getUser.getUsername(req.body.username);

        console.log(userData);

        const weight = userData.weight;

        // calculates speed in both mph and kph
        const userSpeed = speedGenerator.speedCalc(req.body.distance, req.body.time);
        //calculates calories burned
        const userCalories = calorieGenerator.caloriesCalc(req.body.intensity, req.body.time, weight);

        const reqPost = new UserPosts({
            username: req.body.username,
            sport: req.body.sport,
            distance: req.body.distance,
            time: req.body.time,
            description: req.body.description,
            speedkph: userSpeed.kph,
            speedmph: userSpeed.mph,
            calories: userCalories
        })

        const maliciousInput = serverFilter.filter(reqPost.description);
        if (maliciousInput === true) {
            res.send({
                posted: 'no',
                message: 'Please avoid using <, >, &, *, {, }, $ in your description'
            });
        } else {
            // post calculated data and the user input to the database so it can be displayed in users feeds
            const posted = await post.postDB(reqPost);
            console.log(posted);
            res.send({
                posted: 'yes',
                message: 'Post made check it out on the feed'
            });
        }
    });

    /**
     * /feed Firstly the users data is retrieved using getUser.js as we need their favourite sport to help rank posts.
     * Then using getPost.js all posts are retrieved
     * These posts are then ranked using postRanker.js based on the users taste and the speed and sent back to the client
     */
    app.post('/feed', async (req, res) => {
        const userData = await getUser.getUsername(req.body.username);
        const posted = await getPosts.getPosts();
        console.log(userData.favouriteSport)
        const rankedFeed = postRanker.ranking(posted, userData.favouriteSport);
        //console.log(rankedFeed);
        res.send(rankedFeed);
    });

    app.listen(8080, () => console.log("Cluster "+cluster.worker.id + " listening at port 8080"));
}
