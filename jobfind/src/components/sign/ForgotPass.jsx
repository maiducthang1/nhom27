import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
    const [matkhau, setMatKhau] = useState('');
    const [repass, setRepass] = useState('');
    const [email, setEmail] = useState('');
    const [layma, setLayMa] = useState('');
    const [showform, setShowForm] = useState('');
    const [xacnhan, setConfirm] = useState('');
    const navigate = useNavigate();
    const sendMailPass = async (e) => {
        e.preventDefault();
        let result = await fetch(`http://localhost:3001/jobfinder/forgotpassword/${email}`)
        .then(res =>res.json())
        .then(data => {
            if(data){
                console.log(data.x)
                setLayMa(data.x)
                setShowForm('done')
            }
            else {alert('Gửi mail thất bại');
        }})
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        var dataa = {Password: repass}
        if(xacnhan!=layma){
            alert('Mã xác nhận không trùng khớp')
        }else if (matkhau!=repass) alert('Mật khẩu nhập lại không trùng khớp với mật khẩu')
        else{
            let result = await 
        fetch(`http://localhost:3001/jobfinder/changepass/${email}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
              body: JSON.stringify(dataa),
            },
        ).then(res =>res.json())
        .then(data => {
            if(data){
                alert('Cập nhật mật khẩu thành công')
                navigate("/Login");
            }
            else {alert('Lưu thất bại');
        }})
        }
    }
    return (
        <div>
            {showform== '' ? ( <>
                <div style={{position: 'fixed',padding: '20px',marginLeft: '30%',top: '25%',background:'#D9D9D9',width:'40%',borderRadius:'20px'}}>
                    <form action="" onSubmit={sendMailPass}>
                <input type="email" placeholder="Email của bạn" value={email} onChange={(e) =>setEmail(e.target.value)} required/>
                <button >Lấy mã</button>
                </form>
                </div>   
            </>):
                <div style={{position: 'fixed',padding: '20px',marginLeft: '30%',top: '25%',background:'#D9D9D9',width:'40%',borderRadius:'20px'}}>
                <div>Đã gửi mã xác nhận, vui lòng kiểm tra mail</div>
                <div>Việc gửi mail có thể tốn vài giây</div>
                <form action="/" onSubmit={onSubmit}>
                <table>
                        <tr>
                            <td><div>Mã xác nhận</div></td>
                            <td><div><input type="number" value={xacnhan} onChange={(e) =>setConfirm(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Mật khẩu mới</div></td>
                            <td><div><input type="password" value={matkhau} onChange={(e) =>setMatKhau(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Nhập lại mật khẩu mới</div></td>
                            <td><div><input type="password" value={repass} onChange={(e) =>setRepass(e.target.value)}/></div></td>
                        </tr>
                </table>
                <button>Xác nhận</button>
                </form>
                </div>
            }
            
        </div>
    )
}
export default ForgotPass