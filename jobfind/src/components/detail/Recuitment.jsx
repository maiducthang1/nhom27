import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { Link, useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import {callError, callSuccess, fileLimit} from "../errorLibrary/call.mjs";
import { baoloi } from "../errorLibrary/allError.mjs";
const Recuitment = () => {
    const {Id} = useParams();
    const [luong, setLuong] = useState(null);
    const [company, setCompany] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    const [companyContact, setContact] = useState(null);
    const [job, setJob] = useState(null);
    const [require, setRequire] = useState(null);
    const [benefits, setBenefits] = useState(null);
    const [address, setAddress] = useState(null);
    const [number, setNumber] = useState(null);
    const [exp, setExp] = useState(null);
    const [image, setImage] = useState(null);
    const [dateterm, setDateTerm] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const handleSubmission = () => {
		const formData = new FormData();
        console.log(selectedFile) 
		formData.append('File', selectedFile);
        if(!cookies.user){
            callError(baoloi.needlogin)
        }else
        if(!selectedFile){
            callError(baoloi.filenotselect)
        } else
        if(fileLimit(selectedFile,30)){
		fetch(`http://localhost:3001/jobfinder/application/${Id}/${cookies.user}`,
			{
				method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                    },
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				if(result){
                    callSuccess(baoloi.cvSuccess);
                }
                else {callError(baoloi.cvFail);
                }
			})
			.catch((error) => {
				console.error('Error:', error);
			});
        }
	};
    useEffect(()=> {
        fetch(`http://localhost:3001/jobfinder/postdetail/${Id}`)
        .then(res =>res.json())
        .then(data => {
            console.log(data[0])
            setAddress(data[0].Address)
            setLuong(data[0].Salary)
            setJob(data[0].Job)
            setAddress(data[0].Address)
            setBenefits(data[0].Benefits)
            setRequire(data[0].JobRequire)
            setNumber(data[0].Number)
            setExp(data[0].Experience)
            setDateTerm(data[0].DateTerm.split("T")[0])
            setCompany(data[0].Company)
            setCompanyId(data[0].CompanyId)
            setContact(data[0].Contact)
            setImage(data[0].Image)
        })
        console.log(Id)
    },[])
    return(
        <div style={{position:"absolute", display: "flex", justifyContent: "flex-start", left:"20%",margin:"20px"}}>
            <div>
                <div style={{background:"gainsboro", padding:"20px",borderRadius:"7px"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div className="text" style={{fontWeight:"500",fontSize:"35px"}}>{job}</div>
                        <div>
                        <label style={{padding:"5px",borderRadius:"7px",background: "aliceblue"}} For="fileinput">Chọn cv</label>
                        <input style={{display:"none"}} id="fileinput" type="file" name="file"accept=".pdf" onChange={(e)=>{setSelectedFile(e.target.files[0])}}/>
                        <button onClick={handleSubmission} style={{margin: "0px 10px"}}>Nộp</button>
                        </div>
                        
                    </div>
                    <div><h3>Giới thiệu công việc</h3></div>
                    <div className="gridContainerRecuit">
                        <div><h3 className="text">Lương</h3>
                            <div>{luong} triệu</div>
                        </div>
                        
                        <div><h3 className="text">Công việc</h3>
                            <div>{job}</div>
                        </div>
                        <div><h3 className="text">Kinh nghiệm</h3>
                            <div>{exp?exp:'Không'}</div>
                        </div>
                        
                        <div><h3 className="text">Số lượng</h3>
                            <div>{number}</div>
                        </div>
                    </div>
                    
                    <div style={{background:"black",height:"1px",width:"90%",left:"5%",position:"relative"}}></div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div>Hạn nộp hồ sơ: {dateterm}</div>
                        <div style={{paddingLeft:"50px"}}>Khu vực: {address}</div>
                    </div>
                </div>
                <div style={{background:"gainsboro",marginTop:"20px",borderRadius:"10px"}}><h2> Mô tả/Yêu cầu công việc </h2>
                    <div>{require?'Yêu cầu: '+require:'Không có yêu cầu thêm'}</div>
                    <div>{benefits?'Quyền lợi: '+benefits:""}</div>
                </div>
            </div>
            <div style={{margin:"0px 20px",background:"gainsboro",height:"45%", width:"175px",borderRadius:"10px",padding:"10px"}}>
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <div style={{width:"40px",height:"40px",padding:"5px"}}><img className="icon-fit"src={image?+process.env.PUBLIC_URLimage:process.env.PUBLIC_URL+"/company.jpeg"} alt="" /></div>
                    <div>{company}</div>
                </div>
                <div>
                    <div>Liên hệ: {companyContact?companyContact:'Chưa có thông tin liên hệ'}</div>
                    <div><Link to={`/CompanyDetail/${companyId}`}>Xem chi tiết</Link></div>
                </div>
            </div>
            
        </div>
    )
}
export default Recuitment