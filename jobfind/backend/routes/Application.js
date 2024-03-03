const express = require('express');
const ApplicationController = require('../controllers/AplicationController');
const route = express.Router();

route.post('/application/:Post/:Id',ApplicationController.sendCV);
route.get('/getAllMyAppli/:Id',ApplicationController.getAllMyCV);
route.put('/application/check/:Id',ApplicationController.checkRead);
// route.get('/cvapply/:Post',ApplicationController.getCvApply);
// route.get('/getAllCV/:Id',ApplicationController.getAllCV);
// route.get('/getViewCVDetail/:Id',ApplicationController.getAllCV);
// route.get('/sendMail/:Id',ApplicationController.sendMail);

module.exports = route;