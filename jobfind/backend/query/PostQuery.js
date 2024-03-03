const config = require('../dbconfig');
const sql = require('mssql');

async function searchPostbyJob(job){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('job',sql.Int,job)
        .query('SELECT * FROM Post WHERE Id_Job=@job');
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}
async function getPost(){
    try{
        var dateObj = new Date();
        var month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        var date = ('0' + dateObj.getDate()).slice(-2);
        var year = dateObj.getFullYear();
        var shortDate = year + '-' + month + '-' + date;
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('date',sql.NVarChar(10),shortDate)
        .query('SELECT Post.Id, Job.Name Job,Salary,Post.Address,Userr.Name Company, Post.Status FROM Post inner join Job on Post.Id_job=Job.Id inner join Userr on Userr.Id=(select Id_user from Company where Id=Post.Id_Company) where DateTerm>=@date and Post.Status=0 and Userr.Status = 0');
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}
async function postDetail(id){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.Int,id)
        .query('SELECT Company.Contact, Post.DateTerm ,Post.Experience, Post.JobRequire,Post.Number,Post.Benefits,Post.Id,Job.Name Job,Salary,Post.Address,Userr.Name Company,Company.Id CompanyId, Userr.Image Image, Post.Status FROM Post inner join Job on Post.Id_job=Job.Id inner join Userr on Userr.Id=(select Id_user from Company where Id=Post.Id_Company and Post.Status=0) inner join Company on Company.Id_user=Userr.Id where Post.Id=@id');
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}
module.exports = {
    searchPostbyJob:searchPostbyJob,
    getPost:getPost,
    postDetail:postDetail
}