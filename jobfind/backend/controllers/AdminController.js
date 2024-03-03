const express = require('express');
app = express();
const qr = require('../query/AdminQuery');
class AdminController{
    getAllAccount(req,res){
        qr.getAllAccount().then(result=>{
            res.status(200).send(result)
        });
    }
    changeStatus(req,res){
        let id = req.params.Id;
        qr.changeStatus(id).then(result=>{
            res.status(200).send(result)
        });
    }
    getPost(req,res){
        qr.getPost().then(result=>{
            res.status(200).send({result})
        });
    }
    updatePost(req,res){
        qr.updatePost().then(result=>{
            res.status(200).send(result)
        });
    }
    getCategory(req,res){
        qr.getCategory().then(result=>{
            res.status(200).send(result)
        });
    }
    getChart(req,res){
        let dateStart = req.params.Start;
        let dateEnd = req.params.End;
        qr.getChart(dateStart,dateEnd).then(result=>{
            res.status(200).send(result)
        });
    }
    saveCate(req,res){
        let id = req.params.Id;
        let cate = req.body;
        console.log('this');
        qr.saveCate(id,cate).then(result=>{
            res.status(200).send(result)
        });
    }
}
module.exports= new AdminController;