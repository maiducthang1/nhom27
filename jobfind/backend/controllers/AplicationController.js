const express = require('express');
const qr = require('../query/ApplicationQuery');
const { verifyJWT } = require('../middleware/JWTeff');
app = express();

class ApplicationController{
    getCvApply(req,res){
        let post = req.params.Post;
        qr.getCvApply(post).then(result=>{
            res.status(200).send(result)
        });
    }
    sendCV(req,res){
        let post = req.params.Post;
        if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
            }
        var obj = Object.assign({},req.files)
        const file = obj.File;
        const name = `${(Date.now())}${file.name}`;
        let token = req.params.Id;
        var result= verifyJWT(token);
        qr.sendCV(post, result.name,`/application/${name}`).then(result=>{
        file.mv(`${__dirname}../../../public/application/${name}`, err => {
            if (err) {
            console.error(err);
            return res.status(500).send(err);
            }
            console.log('this');
            res.send(result);
            });
            
        });
    }
    getAllMyCV(req,res){
        let token = req.params.Id;
        var result= verifyJWT(token);
        qr.getAllMyCV(result.name).then(result=>{
            res.status(200).send(result)
        });
    }
    checkRead(req,res){
        let id = req.params.Id;
        qr.checkRead(id).then(result=>{
            res.status(200).send(result)
        });
    }
}
module.exports= new ApplicationController;