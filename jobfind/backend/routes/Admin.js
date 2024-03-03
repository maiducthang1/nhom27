const express = require('express');
const AdminController = require('../controllers/AdminController');
const route = express.Router();

// route.post('/application/:Post/:Id',ApplicationController.sendCV);
// route.get('/getAllMyAppli/:Id',ApplicationController.getAllMyCV);
// route.put('/application/check/:Id',ApplicationController.checkRead);
// route.get('/cvapply/:Post',ApplicationController.getCvApply);
// route.get('/getAllCV/:Id',ApplicationController.getAllCV);
// route.get('/getViewCVDetail/:Id',ApplicationController.getAllCV);
route.get('/getAllAccount',AdminController.getAllAccount);
route.put('/changeStatus/:Id',AdminController.changeStatus);
route.get('/getPost',AdminController.getPost);
route.put('/updatePost',AdminController.updatePost);
route.get('/getCategory',AdminController.getCategory);
route.get('/getChart/:Start/:End',AdminController.getChart);
route.put('/save/:Id',AdminController.saveCate);



module.exports = route;