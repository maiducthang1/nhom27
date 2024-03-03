const config = require('../dbconfig');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const { createJWT } = require('../middleware/JWTeff');
async function login(username,password){
    try{
        console.log(username);
        let pool = await sql.connect(config);   
        let checkuser = await pool.request()
        .input('username', sql.VarChar(50), username)
        .input('password', sql.VarChar(50), password)
        .query('select Id_Role,Status from Userr inner join Account on Userr.Id_account=Account.Id where Account.Id=@username and Account.Password=@password and Userr.Status=0');
        //const validPassword = await bcrypt.compare(password, checkuser.recordset[0].Password);
        //var result= [];
        //result.push(checkuser.recordset);
        let token = createJWT(username);
        //if  (validPassword){return [checkuser.recordset,token];}
        //else return validPassword;
        if (checkuser.recordset[0])
        return [true,token,checkuser.recordset[0].Id_Role];
        else return [false,'null'];
    }
    catch(error){
        console.log(error);
    }
}
async function register(username,password,name,role,email){
    try{
        let pool = await sql.connect(config);
        let dem = await pool.request()
        .input('username', sql.NVarChar(50), username)
        .query("Select * from account where Id = @username");
        if(dem.recordset.length > 0){
            return false;
        }  
        dem = await pool.request()
        .input('username', sql.NVarChar(50), email)
        .query("Select * from account where Email = @username");
        if(dem.recordset.length > 0){
            return false;
        } else {
        let checkuser = await pool.request()
        .input('username', sql.VarChar(50), username)
        .input('password', sql.VarChar(50), password)
        .input('email', sql.VarChar(100), email)
        .input('role', sql.VarChar(100), role)
        .query('Insert into account (Id,Password,Email,Id_Role) values (@username,@password,@email,@role)');
        checkuser = await pool.request()
        .input('username', sql.VarChar(50), username)
        .input('name', sql.NVarChar(50), name)
        .query('Insert into Userr (Status,Name,Id_account) values (0,@name,@username)');
        if(role==2){
            checkuser = await pool.request()
            .input('username', sql.VarChar(50), username)
            .query('Insert into Candidate (Id_user) select Id from Userr where Id_account=@username');
        }
        else{
            checkuser = await pool.request()
            .input('username', sql.VarChar(50), username)
            .query('Insert into Company (Id_user) select Id from Userr where Id_account=@username');
        }
        
        return true;}
    }
    catch(error){
        console.log(error);
    }
}
async function accountDetail(acc){
    try{
        let pool = await sql.connect(config);
        let qer = await pool.request()
        .input('username', sql.VarChar(50), acc)
        .query("Select Id_Role from account where Id = @username");
        var role = qer.recordset[0].Id_Role;
        console.log('why',role==3);
        if(role==3){
            qer = await pool.request()
            .input('username', sql.VarChar(50),acc)
            .query('SELECT Name,Image,Address,Email,Description,Contact FROM Account inner join Userr on Userr.Id_account=Account.Id inner join Company on Company.Id_user=Userr.Id where Account.Id=@username');
            role = true;
        }
        else {
            qer = await pool.request()
            .input('username', sql.VarChar(50),acc)
            .query('SELECT Name,Image,Address,Email,Description,Level,Bio,Age,Gender FROM Account inner join Userr on Userr.Id_account=Account.Id inner join Candidate on Candidate.Id_user=Userr.Id where Account.Id=@username');
            role = false;
            console.log('in');
        }
        var list = [];
        list.push(role);
        list.push(qer.recordset);
        return list;
    }
    catch(error)
    {
        return false;
    }
}
async function saveInfo(username,address,email,description,level,bio,age,gender){
    try{
        console.log("haha",username)
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('username',sql.NVarChar(50),username)
        .input('email',sql.VarChar(100),email)
        .query('UPDATE Account SET Email=@email WHERE Id=@username');
        console.log("haha",age)
        qr = await pool.request()
        .input('username',sql.NVarChar(50),username)
        .input('address',sql.NVarChar(100),address)
        .query('UPDATE Userr SET Address=@address WHERE Id_account=(select Id from Account where Id=@username)');
        qr = await pool.request()
        .input('username',sql.NVarChar(50),username)
        .input('description',sql.VarChar(200),description)
        .input('level',sql.NVarChar(20),level)
        .input('bio',sql.VarChar(200),bio)
        .input('age',sql.Int,age)
        .input('gender',sql.Bit,gender)
        .query('UPDATE Candidate SET Description=@description,Level=@level,Bio=@bio,Age=@age,Gender=@gender WHERE Id_user=(select Id from Userr where Id_Account=(select Id from Account where Id=@username ))');
        return true;
    }
    catch(error)
    {
        return false;
    }
}
    async function avaterupdate(id,path){
        try{
            let pool = await sql.connect(config);
            let qr =  await pool.request()
            .input('ida',sql.VarChar(50),id)
            .input('linka',sql.NVarChar(300),path)
            .query('update Userr SET [Image]=@linka where Id_account=@ida');
            console.log(id,'haha',path)
            return true;
        }
        catch(error)
        {
            return false;
        }
    }
async function createAccount(acc){
    try{
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('id',sql.NChar,acc.Id)
        .input('password',sql.NChar,acc.Password)
        .input('email',sql.NChar,acc.Email)
        .query('INSERT INTO account(Id,Password,Email) VALUES (@id,@password,@email)');
        return acc.Id;
    }
    catch(error)
    {
        return false;
    }
}
async function sendMailForgetPassword(inputmail,xrand){
    let pool = await sql.connect(config);
    let qr =  await pool.request()
    .input('mail',sql.NChar,inputmail)
    .query('SELECT Password FROM Account WHERE Email =@mail')
    try{
        var nodemailer = require('nodemailer');

        const option = {
            service: 'gmail',
            auth: {
                user: 'tuxuanbui1111@gmail.com', // email hoặc username
                pass: 'gmkm dquj jtum tacy' // password
            }
        };
        var transporter = nodemailer.createTransport(option);
        
        transporter.verify(function(error, success) {
            // Nếu có lỗi.
            if (error) {
                console.log(error);
                return false;
            } else { //Nếu thành công.
                console.log('Kết nối thành công!');
                var mail = {
                    from: 'tuxuanbui1111@gmail.com', // Địa chỉ email của người gửi
                    to: `${inputmail}`, // Địa chỉ email của người gửi
                    subject: 'Mã xác nhận reset mật khẩu', // Tiêu đề mail
                    text: `Mã bảo mật: ${xrand}`, // Nội dung mail dạng text
                };
                try {
                    transporter.sendMail(mail, function(error, info) {
                        if (error) { // nếu có lỗi
                            console.log(error);
                        } else { //nếu thành công
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    
                } catch (error) {
                    
                }
                //Tiến hành gửi email
                return xrand;
                
            }
        });       
    }
    catch(error)
    {
        return false;
    }
}
async function changePass(email,pass){
    try{
        console.log('in');
        let pool = await sql.connect(config);
        let qr =  await pool.request()
        .input('password',sql.NVarChar(50),pass)
        .input('email',sql.NVarChar(100),email)
        .query('update Account SET Password=@password where Email=@email');
        return true;
    }
    catch(error)
    {
        return false;
    }
}
module.exports = {
    login:login,
    register:register,
    createAccount:createAccount,
    accountDetail:accountDetail,
    saveInfo:saveInfo,
    avaterupdate:avaterupdate,
    sendMailForgetPassword:sendMailForgetPassword,
    changePass:changePass
}