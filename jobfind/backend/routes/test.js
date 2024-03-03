const express = require('express');
const userController = require('../controllers/userController');
const route = express.Router();

route.get('/userapi',(req,res)=>{
    res.json({ message: "Welcome to bezkoder application." });
})
route.post('/fuck',userController.getLogin)
module.exports = route;