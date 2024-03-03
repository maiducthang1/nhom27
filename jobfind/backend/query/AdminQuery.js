const config = require('../dbconfig');
const sql = require('mssql');

async function getAllAccount(){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .query('select * from Userr inner join Account on Userr.Id_account=Account.Id');
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}
async function changeStatus(id){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.Int,id)
        .query('update Userr set Status = (Case Status when 1 then 0 else 1 end) where Id=@id');
        return true;
    }
    catch(error)
    {
        return false;
    }
}
async function getPost(){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .query('SELECT DateTerm, Post.Id, Job.Name Job,Salary,Post.Address,Userr.Name Company, Post.Status FROM Post inner join Job on Post.Id_job=Job.Id inner join Userr on Userr.Id=(select Id_user from Company where Id=Post.Id_Company)');
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}
async function updatePost(){
    try{
        var dateObj = new Date();
        var month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        var date = ('0' + dateObj.getDate()).slice(-2);
        var year = dateObj.getFullYear();
        var shortDate = year + '-' + month + '-' + date;
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('date',sql.NVarChar(10),shortDate)
        .query("update Post set Status = 2 where DateTerm<@date");
        return true;
    }
    catch(error)
    {
        return false;
    }
}
async function getCategory(){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .query('SELECT * from Job');
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}
async function getChart(start,end){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('start',sql.NVarChar(10),start)
        .input('end',sql.NVarChar(10),end)
        .query('SELECT DateTerm,COUNT(*) as COUNT from Post where DateTerm>=@start and DateTerm<=@end GROUP BY DateTerm');
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}saveCate
async function saveCate(id,cate){
    try{
        let pool = await sql.connect(config);
            
        if (id=='new'){
        console.log('new');
        let qer =  await pool.request()
        .input('status',sql.Bit,cate.Status)
        .input('name',sql.NVarChar(25),cate.Name)
        .query('Insert into Job (Status,Name) values (@status,@name)');
        
    } 
        else {
            console.log('old');
        let qr =  await pool.request()
        .input('id',sql.Int,id)
        .input('status',sql.Bit,cate.Status)
        .input('name',sql.NVarChar(25),cate.Name)
        .query('UPDATE Job SET Name=@name,Status=@status WHERE Id=@id');
        }
        console.log('haha');
        return true;
    }
    catch(error)
    {
        return false;
    }
}

module.exports = {
    getAllAccount:getAllAccount,
    updatePost:updatePost,
    changeStatus:changeStatus,
    getPost:getPost,
    getCategory:getCategory,
    getChart:getChart,
    saveCate:saveCate
}