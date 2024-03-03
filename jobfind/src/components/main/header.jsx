import { Link, useNavigate } from "react-router-dom";
import "../../css/style.css"
import { useCookies } from "react-cookie";
import { useEffect } from "react";
const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [role, setRole, removeCookieRole] = useCookies(["role"]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(cookies.role == 1){
        removeCookie('user')
        removeCookieRole('role')
        }
    },[])
    return(
        <div className='topbar'>
            <div className="Leftside" style={{padding:"15px"}}>
                <Link to="/" className="loglink topbarelement text">TT</Link>
                <Link to="/" className="loglink topbarelement text">Việc làm</Link>
                <Link to="/Company" className="loglink topbarelement text">Công ty</Link>
            </div>
            <div className="Rightside">
                {cookies.user ?(
                    <div>
                    <button className="topbarelement topbarbtn">
                    {cookies.role !=3 ?(
                        <Link to="/User" className="loglink">Cá nhân</Link>
                    ):(
                        <Link to="/MyCompany" className="loglink">Cá nhân</Link>
                    )}
                     
                    </button>
                    <button className="topbarelement topbarbtn">
                    <Link to="/Login" className="loglink">Đăng xuất</Link>
                    </button>
                    </div>
                ):(
                    <button className="topbarelement topbarbtn">
                    <Link to="/Login" className="loglink">Đăng nhập</Link>
                    </button>
                )}
            </div>
        </div>
    )
}
export default Header