const express = require('express');
const app = express();
const body = require('body-parser');
app.use(body.urlencoded({extended: true}));
app.use(body.json());
class userController {
    getLogin(req, res){
    console.log(req.body);
    res.json({ message: "Welcome to bezkoder application." });
    }
}
module.exports = new userController;