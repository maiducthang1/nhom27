const express = require('express');
const JobController = require('../controllers/JobController');
const AccountController = require('../controllers/AccountController');
const PostController = require('../controllers/PostController');
const route = express.Router();
// route.get('/',AccountController.verifyToken, PostController.getPosts);
route.get('/',AccountController.verifyToken);
route.get('/listjoba',JobController.listJobA);
route.get('/getjob/:Id',JobController.getJob);

module.exports = route;