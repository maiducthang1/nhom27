const express = require('express');
const qr = require('../query/CompanyQuery');
const { verifyJWT } = require('../middleware/JWTeff');
app = express();

class CompanyController{
    getCvApply(req,res){
        let post = req.params.Post;
        qr.getCvApply(post).then(result=>{
            res.status(200).send(result)
        });
    }
    getAll(req,res){
        qr.getAll().then(result=>{
            res.status(200).send(result)
        });
    }
    getOneDetail(req,res){
        let Id = req.params.Id;
        qr.getOneDetail(Id).then(result=>{
            res.status(200).send(result)
        });
    }
    getAllPost(req,res){
        let Id = req.params.Id;
        qr.getAllPost(Id).then(result=>{
            res.status(200).send(result)
        });
    }
    newPost(req,res){
        let token = req.params.Id;
        var result= verifyJWT(token);
        var data = req.body;
        qr.newPost(result.name,data).then(result=>{
            res.status(200).send(result)
        });
    }
    myConpany(req,res){
        let token = req.params.Id;
        var result= verifyJWT(token);
        qr.myCompany(result.name).then(result=>{
            res.status(200).send(result)
        });
    }
    getAllAppliThisPost(req,res){
        let id = req.params.Id;
        qr.getAllAppliThisPost(id).then(result=>{
            res.status(200).send(result)
        });
    }
    changeCompanyInfo(req,res){
        let token = req.params.Id;
        var result= verifyJWT(token);
        var data = req.body;
        console.log('huhu');
        qr.changeCompanyInfo(result.name,data).then(result=>{
            res.status(200).send(result)
        });
    }
}
module.exports= new CompanyController;