const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')

const register = require('./components/register')
const uniqueUsername = require('./components/uniqueUsername')
const login = require('./components/login')
const post = require('./components/addPost')
const getPosts = require('./components/getPost')

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
    // Compute a bcrypt hash of the password to be stored in the database
    const unique = uniqueUsername(req.body.username);
    if(unique != null){
        res.send({
            verified: 'no'
        })
    }else {
        const hashPass = bcrypt.hashSync(req.body.password);
        console.log(hashPass);
        const registered = await register.registerUser({username: req.body.username, password: hashPass});
        console.log(registered);
        res.send({
            verified: 'yes'
        });
    }
});

app.post('/post', async(req, res) => {
    console.log(req.body.username);
    const reqPost = new UserPosts({
        username: req.body.username,
        sport: req.body.sport,
        distance: req.body.distance,
        time: req.body.time,
        description: req.body.description,
        imageLink: req.body.imageLink})
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