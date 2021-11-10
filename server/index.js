const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

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


app.listen(8080,() => console.log("Server listening at port 8080"));