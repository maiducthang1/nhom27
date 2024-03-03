const express = require('express');
const CompanyController = require('../controllers/CompanyController');
const route = express.Router();

route.get('/getAllCompany',CompanyController.getAll);
route.get('/getOneDetail/:Id',CompanyController.getOneDetail);
route.get('/getAllPostThisCompany/:Id',CompanyController.getAllPost);
route.post('/newPost/:Id',CompanyController.newPost);
route.get('/myCompany/:Id',CompanyController.myConpany);
route.get('/getAllAppliThisPost/:Id',CompanyController.getAllAppliThisPost)
route.put('/changeCompanyInfo/:Id',CompanyController.changeCompanyInfo)
// route.put('/editPost/:Id',CompanyController.editPost);


module.exports = route;