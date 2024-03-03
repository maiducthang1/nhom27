import { Routes, Route } from 'react-router-dom';
import "../../css/style.css";
import Header from "./header";
import CompanyDetail from "../detail/CompanyDetail";
import Home from "../pages/home";
import Self from "../detail/Self";
import Recuitment from "../detail/Recuitment";
import Company from '../pages/company';
import MyCompany from '../detail/MyCompany';
import PostApplication from '../detail/PostApplication';
const MainPage = () => {
    return (
        <div style={{height:"100%"}}>
            <img className="bg" style={{position: "fixed"}} src={process.env.PUBLIC_URL+"/images/background.jpg"} alt=""></img>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Candidate' element={<PostApplication />} />
                <Route path='/Company' element={<Company />} />
                <Route path='/CompanyDetail/:Id' element={<CompanyDetail />} />
                <Route path='/MyCompany' element={<MyCompany />} />
                <Route path='/User' element={<Self />} />
                <Route path='/RecuitDetail/:Id' element={<Recuitment />} />
                <Route path='/Post/:Id' element={<PostApplication />} />
            </Routes>
        </div>
    );
}
export default MainPage