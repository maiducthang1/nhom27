const config = require('../dbconfig');
const sql = require('mssql');

async function getListJob(){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .query('select * from job');
        var list = [];
        list.push(qr.recordset);
        return list;
    }
    catch(error)
    {
        return false;
    }
}
async function getJob(){
    try{
        var dateObj = new Date();
        var month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        var date = ('0' + dateObj.getDate()).slice(-2);
        var year = dateObj.getFullYear();
        var shortDate = year + '-' + month + '-' + date;
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('date',sql.NVarChar(10),shortDate)
        .query('select Name from Job j1 inner join Post  p1 on j1.Id = p1.Id_Job where p1.DateTerm>=@date group by j1.Name, j1.Id ');
        return qr.recordset;
    }
    catch(error)
    {
        return false;
    }
}
async function getListJobA(){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .query("SELECT * FROM Job WHERE Status='false'");
        var list = [];
        list.push(qr.recordset);
        return list;
    }
    catch(error)
    {
        return false;
    }
}
module.exports = {
    getListJob:getListJob,
    getListJobA:getListJobA,
    getJob:getJob
}