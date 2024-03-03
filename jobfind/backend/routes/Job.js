const express = require('express');
const JobController = require('../controllers/JobController');
const route = express.Router();

route.get('/listjob',JobController.listJob);
route.get('/listjoba',JobController.listJobA);
route.get('/job',JobController.getJob);
module.exports = route;