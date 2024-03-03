import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "../../css/admin.css"
import Account from "../admin/Account";
import Post from "../admin/Post";
import Chart from "../admin/Chart";
import { useEffect, useState } from "react";
import Category from "../admin/Category";
import { useCookies } from "react-cookie";
const Admin = () => {
    const [activeTab, setActiveTab] = useState("tab0");
    
    const [cookies, setCookie, removeCookie] = useCookies(["role"]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(cookies.role!=1){
            navigate('/Login');
        }
    })
    return(
        <div>
            <img className="bg" style={{position: "fixed"}} src={process.env.PUBLIC_URL+"/images/background.jpg"} alt=""></img>
            <div style={{position:"fixed",zIndex:"1",width:"15%",height:'100%',background:'#D9D9D9',fontSize: 'large'}}>
                <h3>Quản lý</h3>
                <Link to="/admin/Account" className={activeTab === "tab1" ? "activeTab tabbar" : "tabbar"} onClick={()=>setActiveTab('tab1')}>Tài khoản</Link>
                <Link to="/admin/Post" className={activeTab === "tab2" ? "activeTab tabbar" : "tabbar"} onClick={()=>setActiveTab('tab2')}>Bài viết</Link>
                <Link to="/admin/Category" className={activeTab === "tab3" ? "activeTab tabbar" : "tabbar"} onClick={()=>setActiveTab('tab3')}>Danh mục</Link>
                <Link to="/admin/Chart" className={activeTab === "tab4" ? "activeTab tabbar" : "tabbar"} onClick={()=>setActiveTab('tab4')}>Thống kê</Link>
            </div>
            <Routes>
                <Route path='/Account' element={<Account />} />
                <Route path='/Post' element={<Post />} />
                <Route path='/Category' element={<Category />} />
                <Route path='/Chart' element={<Chart />} />
            </Routes>

        </div>
    )
}
export default Admin;