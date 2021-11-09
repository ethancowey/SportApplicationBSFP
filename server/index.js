const express = require("express");
const app = express();
const cors = require('cors');

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(cors());

app.use('/login', (req, res) => {
    console.log("creds received");
    res.send({
        token: 'test123'
    });
});


app.listen(8080,() => console.log("Server listening at port 8080"));