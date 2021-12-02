const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')

const register = require('./components/register')
const getUser = require('./components/getUser')
const login = require('./components/login')
const post = require('./components/addPost')
const getPosts = require('./components/getPost')
const speedGenerator = require('./components/speed')
const calorieGenerator = require('./components/calories')
const UserPosts = require('./mongoDrivers/userPosts')

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(bodyParser.json())
app.use(cors());

app.post('/login', async (req, res) => {
    const auth = await login.loginUser({username: req.body.username}, req.body.password)
    console.log(auth);
    if (auth === false){
        res.send({
            verified: 'no'
        });
    }else {
        res.send({
            verified: 'yes'
        });
    }
});

app.post('/register', async(req, res) => {
    // check username is unique
    const unique = await getUser.getUsername(req.body.username); // if returns null username is unique
    console.log(unique);
    if(unique != null){
        res.send({
            verified: 'no'
        })
    }else {
        // Compute a bcrypt hash of the password to be stored in the database
        const hashPass = bcrypt.hashSync(req.body.password);
        console.log(hashPass);
        const registered = await register.registerUser({username: req.body.username,
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

app.post('/post', async(req, res) => {
    console.log(req.body.username);

    // get the users weight
    const  userData = await getUser.getUsername(req.body.username);

    console.log(userData);

    const weight = userData.weight;

    // calculates speed in both mph and kph
    const userSpeed = speedGenerator.speedCalc(req.body.distance, req.body.time);
    //calculates calories burned
    const userCalories = calorieGenerator.caloriesCalc(req.body.intensity, req.body.time, weight);

    console.log(userCalories);
    console.log(userSpeed.kph);
    console.log(userSpeed.mph);

    const reqPost = new UserPosts({
        username: req.body.username,
        sport: req.body.sport,
        distance: req.body.distance,
        time: req.body.time,
        description: req.body.description,
        speedkph: userSpeed.kph,
        speedmph:userSpeed.mph,
        calories: userCalories
    })

    // post calculated data and the user input to the database so it can be displayed in users feeds
    const posted = await post.postDB(reqPost);
    console.log(posted);
    res.send({
        posted: 'yes'
    });
});

app.post('/feed', async(req, res) => {
    const posted = await getPosts.getPosts();
    console.log(posted);
    res.send(posted);
});

app.listen(8080,() => console.log("Server listening at port 8080"));