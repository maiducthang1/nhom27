const express = require('express');
app = express();
const qr = require('../query/PostQuery');
class PostController{
    searchPostbyJob(req,res){
        let job = req.params.Job;
        qr.searchPostbyJob(job).then(result=>{
            res.status(200).send({result})
        });
    }
    getPost(req,res){
        qr.getPost().then(result=>{
            res.status(200).send({result})
        });
    }
    postDetail(req,res){
        var id = req.params.Id;
        qr.postDetail(id).then(result=>{
            res.status(200).send(result)
        });
    }
}
module.exports= new PostController;