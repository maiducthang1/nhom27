const { NVarChar } = require('msnodesqlv8');
const config = require('../dbconfig');
const sql = require('mssql');

async function getAll(){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .query("select * from Company inner join Userr on Id_user = Userr.Id where Userr.Status = 0");
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}
async function getOneDetail(Id){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.Int,Id)
        .query("select * from Company inner join Userr on Id_user = Userr.Id where Company.Id = @id");
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}
async function getAllPost(Id){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.Int,Id)
        .query("SELECT Post.Id, Job.Name Job,Salary,Post.Address,Userr.Name Company FROM Post inner join Job on Post.Id_job=Job.Id inner join Company on Company.Id= Post.Id_Company inner join Userr on Userr.Id= Company.Id_user where Userr.Id = (select Id_user from Company where Id=@id)");
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}
async function newPost(Id,body){
    try{
        console.log(body.Address,"-",body.Number,"-",body.Date,"-",body.JobRequire,"-",body.Benefit,"-",body.Exp,"-",body.Salary);
        console.log(body);
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.NVarChar(50),Id)
        .input('address',sql.NVarChar(100),body.Address)
        .input('number',sql.Int,body.Number)
        .input('require',sql.NVarChar(50),body.JobRequire)
        .input('benefit',sql.NVarChar(50),body.Benefit)
        .input('exp',sql.NVarChar(50),body.Exp)
        .input('salary',sql.NVarChar(50),body.Salary)
        .input('date',sql.Date,body.Date)
        .query("Insert into Post (Id_Job,Id_Company,Address,Number,JobRequire,Benefits,Experience,Salary,Dateterm,Status) values (1,(select Company.Id from Company where Id_user=(select Userr.Id from userr where Id_account=@id)),@address,@number,@require, @benefit,@exp,@salary,@date,0)");
        console.log(qr);
        console.log(qr.recordset);
        return true;
    }
    catch(error)
    {
        return false;
    }
}
async function myCompany(Id){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.VarChar(50),Id)
        .query('SELECT Name,Image,Address,Email,Description,Contact FROM Account inner join Userr on Userr.Id_account=Account.Id inner join Company on Company.Id_user=Userr.Id where Account.Id=@id');
        var list = [];
        list.push(qr.recordset);
        qr =  await pool.request()
        .input('id',sql.VarChar(50),Id)
        .query("SELECT Post.Id, Job.Name Job,Salary,Post.Address,Userr.Name Company FROM Post inner join Job on Post.Id_job=Job.Id inner join Company on Company.Id= Post.Id_Company inner join Userr on Userr.Id = Company.Id_user where Userr.Id_account=@id");
        list.push(qr.recordset);
        return list;
    }
    catch(error)
    {
        return false;
    }
}
async function getAllAppliThisPost(Id){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.Int,Id)
        .query('select Application.Id ,Candidate.Age, Candidate.Gender, Userr.Name, Userr.Image, Application.Link from Application inner join Candidate on Application.Id_Candidate = Candidate.Id inner join Userr on Candidate.Id_user = Userr.Id where Application.Id_Post=@id');
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}changeCompanyInfo
async function changeCompanyInfo(Id,info){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.NVarChar(50),Id)
        .input('ts',sql.NVarChar(100),info.TruSo)
        .query('UPDATE Userr SET Address=@ts WHERE Id_account=@id');
        console.log('to this');
        qr = await pool.request()
        .input('id',sql.NVarChar(50),Id)
        .input('gt',sql.NVarChar(100),info.GioiThieu)
        .input('ll',sql.NVarChar(30),info.LienLac)
        .query('UPDATE Company SET Description=@gt,Contact=@ll WHERE Id_user=(select Id from Userr where Id_Account=(select Id from Account where Id=@id ))');
        return true;
    }
    catch(error)
    {
        return false;
    }
}
module.exports = {
    getAll:getAll,
    getOneDetail:getOneDetail,
    getAllPost:getAllPost,
    newPost:newPost,
    myCompany:myCompany,
    getAllAppliThisPost:getAllAppliThisPost,
    changeCompanyInfo:changeCompanyInfo
}