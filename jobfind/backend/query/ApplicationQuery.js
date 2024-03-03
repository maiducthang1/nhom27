const config = require('../dbconfig');
const sql = require('mssql');

async function getCvApply(post){
    try{
        console.log(post);
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('post',sql.Int,post)
        .query('SELECT * FROM Application WHERE Id_Post=@post');
        var list = [];
        list.push(qr.recordset);
        return list;
    }
    catch(error)
    {
        return false;
    }
}
async function sendCV(post,user,path){
    try{
        console.log(post);
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.NVarChar(50),user)
        .input('post',sql.Int,post)
        .query('select * from Application where Id_Candidate = (select Id from Candidate where Id_user= (select Id from Userr where Id_account=@id) and (Application.Id_Post=@post))')
        console.log(qr.recordset.length,"huh");
        if(qr.recordset.length > 0){
            return false;
        }else { 
        qr =  await pool.request()
        .input('post',sql.Int,post)
        .input('id',sql.NVarChar(50),user)
        .input('path',sql.NVarChar(300),path)
        .query('Insert into Application (Id_Post,Checked,Link,Id_Candidate) values (@post,0,@path,(select Id from Candidate where Id_user= (select Id from Userr where Id_account=@id)))');
        console.log(post,"end");
        return true;
        }
    }
    catch(error)
    {
        return false;
    }
}
async function getAllMyCV(id){
    try{
        console.log(id);
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.NVarChar(50),id)
        .query('select Post.Id, Job.Name Job,Salary,Post.Address, Application.Checked FROM Post inner join Job on Post.Id_job=Job.Id inner join Application on Application.Id_Post = Post.Id inner join Candidate on Candidate.Id_user = Application.Id_Candidate where Candidate.Id_user= (select Id from Userr where Id_account=@id)')
        console.log(qr.recordset);
        if(qr.recordset.length > 0){
            return qr.recordset;
        }else { 
        return false;
        }
    }
    catch(error)
    {
        return false;
    }
}
async function checkRead(id){
    try{
        var Checked='1';
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.Int,id)
        .input('check',sql.NVarChar(10),Checked)
        .query('UPDATE Application SET Checked=@check WHERE Id=@id')
        return true;
    }
    catch(error)
    {
        return false;
    }
}
module.exports = {
    getCvApply:getCvApply,
    sendCV:sendCV,
    getAllMyCV:getAllMyCV,
    checkRead:checkRead
}