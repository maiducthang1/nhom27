import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { callError, callSuccess } from "../errorLibrary/call.mjs";
import { baoloi } from "../errorLibrary/allError.mjs";

const Register = () => {
    const [role, setRole] = useState('');
    const [taikhoan, setTaiKhoan] = useState('');
    const [matkhau, setMatKhau] = useState('');
    const [ten, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [repass, setRepass] = useState('');
    const navigate = useNavigate();
    async function checkinput (){
        if (ten.trim().length == 0)
        callError(baoloi.regName);
        else if (taikhoan.trim().length == 0) 
        callError(baoloi.regLogName)
        else if (email.trim().length == 0) 
        callError(baoloi.regEmail)
        else if (role.trim().length == 0) 
        callError(baoloi.regRole)
        else if (matkhau.trim().length == 0) 
        callError(baoloi.regPass)
        else if (repass.trim().length == 0) 
        callError(baoloi.regRePass)
        else if (repass !== matkhau) 
        callError(baoloi.regWrongRepass)
        
        else return true
        return false
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let ha = checkinput();
        if(ha==false)
        {

        }
        else
        {
            var dataa = {Username: taikhoan,Password: matkhau,Name: ten, Role:role, Email: email}
            console.log(role);
        let result = await 
        fetch('http://localhost:3001/jobfinder/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
              body: JSON.stringify(dataa),
            },
        ).then(res =>res.json())
        .then(data => {
            if(data.result){
                callSuccess(baoloi.registerSuccess)
                navigate("/Login");
            }
            else {callError(baoloi.registerFail)
        }
        })
        }
        //
        
    }
    return(
        <div style={{width:"100%", height:"100%"}}>
            <img className="bg" src={process.env.PUBLIC_URL+"/images/background.jpg"} alt=""></img>
            <div className="text" style={{position:"absolute", top:"15%", left:"45%",fontSize:"55px", fontWeight:"500"}}>Đăng ký</div>
            <div style={{position:"absolute", top:"27%", left:"25%"}}>
                <form action="/" onSubmit={onSubmit}>
                <div>
                    <table>
                        <tr>
                            <th>Tên</th>
                            <td><div><input type="text" value={ten} onChange={(e) =>setTen(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Tài khoản</div></td>
                            <td><div><input type="text" value={taikhoan} onChange={(e) =>setTaiKhoan(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Email</div></td>
                            <td><div><input type="text" value={email} onChange={(e) =>setEmail(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Bạn là</div></td>
                            <td><div style={{marginBottom:"10px"}} onChange={(e) =>setRole(e.target.value)}>
                                <input className="optionbtn" type="radio" value="2" name="gender" /> Ứng viên
                                <input className="optionbtn" type="radio" value="3" name="gender" /> Nhà tuyển dụng
                            </div></td>
                        </tr>
                        <tr>
                            <td><div>Mật khẩu</div></td>
                            <td><div><input type="password" value={matkhau} onChange={(e) =>setMatKhau(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Nhập lại mật khẩu</div></td>
                            <td><div><input type="password" value={repass} onChange={(e) =>setRepass(e.target.value)}/></div></td>
                        </tr>
                    </table>
                </div>
                <button type="submit" className="btnlog">Đăng ký</button>
                </form>
            </div>
        </div>
    )
}
export default Register