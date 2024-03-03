const express = require('express');
const PostController = require('../controllers/PostController');
const route = express.Router();

route.get('/listjob',PostController.searchPostbyJob);
route.get('/post',PostController.getPost);
route.get('/postdetail/:Id',PostController.postDetail);
module.exports = route;
