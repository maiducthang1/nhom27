const express = require('express');
app = express();
const account = require('../routes/Account');
const body = require('body-parser');
const qr = require('../query/AccountQuery');
const { verifyJWT } = require('../middleware/JWTeff');
class AccountController{
    login(req,res){
        console.log(req.body);
        let username = req.body.Username;
        let password = req.body.Password;
        qr.login(username,password).then(result=>{
            // res.cookie('user',result[1]);
            res.status(200).send({result});
        });
    }
    register(req,res){
        console.log(req.body);
        let username = req.body.Username;
        let password = req.body.Password;
        let name = req.body.Name;
        let role = req.body.Role;
        let email = req.body.Email;
        qr.register(username,password,name,role,email).then(result=>{
            // res.cookie('user',result[1]);
            res.status(200).send({result});
        });
    }
    upload(req,res){     
        if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
            }
        var obj = Object.assign({},req.files)
        console.log(obj.File)
        const file = obj.File;
        const name = `${(Date.now())}${file.name}`;
        file.mv(`${__dirname}../../../public/uploads/${name}`, err => {
            if (err) {
            console.error(err);
            return res.status(500).send(err);
            }
            let token = req.params.Id;
            var result= verifyJWT(token);
            qr.avaterupdate(result.name,`/uploads/${name}`).then(result=>{
                res.json({ fileName: file.name, filePath: `/uploads/${name}`,result:result });
            });
            
        });
    };
    accountDetail(req,res){
        let token = req.params.Id;
        var result= verifyJWT(token);
        qr.accountDetail(result.name).then(result=>{
            res.status(200).send(result)
        });
    }
    saveInfo(req,res){
        console.log(req.body)
        let token = req.params.Id;
        var result= verifyJWT(token);
        let address = req.body.Address;
        let email = req.body.Email;
        let description = req.body.Description;
        let level = req.body.Level;
        let bio = req.body.Bio;
        let age = req.body.Age;
        let gender = req.body.Gender;
        qr.saveInfo(result.name,address,email,description,level,bio,age,gender).then(result=>{
            res.status(200).send({result})
        });
    }
    createAccount(req,res){
        let acc = req.body.token;
        var result= verifyJWT(token);
        qr.createAccount(result).then(result=>{
            res.status(200).send({result})
        }); 
    }
    verifyToken(req,res){
        const token=req.cookies.user;
        var result= verifyJWT(token);
        res.status(200).send({result})
    }
    sendMailForgetPassword(req,res){
        let email = req.params.Id;
        var x = Math.floor(Math.random() * 100000);
        qr.sendMailForgetPassword(email,x).then(result=>{
            res.status(200).send({x})
        }); 
    }
    changePass(req,res){
        let email = req.params.Id;
        let pass = req.body.Password;
        qr.changePass(email,pass).then(result=>{
            res.status(200).send(result)
        }); 
    }
}
module.exports= new AccountController;