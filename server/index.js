const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const register = require('./components/register')

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(bodyParser.json())
app.use(cors());

app.post('/login', (req, res) => {
    console.log(req.body.username);
    res.send({
        verified: 'yes'
    });
});

app.post('/register', async(req, res) => {
    console.log(req.body.username);
    const registered = await register.registerUser({username: "hi", password: "yes"});
    console.log(registered);
    res.send({
        verified: 'yes'
    });
});


app.listen(8080,() => console.log("Server listening at port 8080"));