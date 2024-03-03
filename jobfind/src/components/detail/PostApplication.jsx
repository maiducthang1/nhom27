import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
const PostApplication = () => {
    const {Id} = useParams();
    const [luong, setLuong] = useState(null);
    const [company, setCompany] = useState(null);
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
    const [showAppli,setshowAppli]=useState(true);
    const [showCv,setshowCV]=useState('');
    const [appli, setAppli] = useState([]);
    useEffect(()=> {
        fetch(`http://localhost:3001/jobfinder/postdetail/${Id}`)
        .then(res =>res.json())
        .then(data => {
            console.log(data[0])
            setAddress(data[0].Address)
            setLuong(data[0].Salary)
            setJob(data[0].Job)
            setAddress(data[0].Address)
            setBenefits(data[0].benefits)
            setRequire(data[0].JobRequire)
            setNumber(data[0].Number)
            setExp(data[0].Experience)
            setDateTerm(data[0].DateTerm.split("T")[0])
            setCompany(data[0].Company)
            setImage(data[0].Image)
        })
        fetch(`http://localhost:3001/company/getAllAppliThisPost/${Id}`)
        .then(res =>res.json())
        .then(data => {
            console.log(data[0])
            setAppli(data);
        })
    },[])
    const showApplication = () => {
        setshowAppli(!showAppli) ;
    }
    const showCV = async (key,IdApply) => {
        console.log(IdApply)
        if(showCv != key){
        setshowCV(key);
        fetch(`http://localhost:3001/jobfinder/application/check/${IdApply}`,{
				method: 'PUT',
                headers: {
                    'Accept': 'application/json'
                    },
                body:appli,
			})   
			.then((response) => response.json())
			.then(data => {
                console.log(data)
			})
			.catch((error) => {
				console.error('Error:', error);
		    });
        }
        else setshowCV('');
    }
    return(
        <div style={{position:"absolute", display: "flex", justifyContent: "flex-start", left:"20%",margin:"20px"}}>
            {!showAppli ? ( <>
                <div style={{position: "fixed",background: "#C4BEBE",width: "70%", zIndex:"1", padding:"10px",borderRadius:"10px",left:"14%"}}>
                    <div>
                        <button style={{position: "inherit",left: "92%",background: "#ff474780"}} 
                                    onClick={showApplication}>
                                Thoát
                        </button>
                        <div style={{overflow:"scroll", height:'500px'}}>
                            Danh sách các ứng viên đã nộp
                            {appli.map(apply => (
                                <div className="listjob" key={apply.Id}>
                                    <div style={{display:"flex"}}>Tuổi: {apply.Age?apply.Age:'Chưa thiết lập'}</div>
                                    <br />
                                    <div style={{display:"flex"}}>Giới tính: {apply.Gender==null?'Chưa thiết lập':(apply.Gender?'Nam':'Nữ')}</div>
                                    <br />
                                    <div style={{display:"flex"}}>{apply.Age}</div>
                                    {showCv!=apply.Name ? ( <>
                                    <div></div>
                                    </>):
                                    <div style={{position: 'fixed',width: '70%',height: '50%',top: '2%'}}>
                                        <button onClick={()=>showCV(apply.Name,apply.Id)}>Thoát</button>
                                        <div></div>
                                        <embed src={process.env.PUBLIC_URL+'/application/1698285557166aaa.pdf'} type="" width={'500px'} height={'600px'}/>
                                    </div>
                                    }
                                    <button onClick={()=>showCV(apply.Name,apply.Id)}>Xem CV</button>
                                    {/* <a href={apply.Link?process.env.PUBLIC_URL+apply.Link:process.env.PUBLIC_URL+"/uploads/1698268528317mongnu.jpg"} download>Lưu CV</a> */}
                                </div>
                                
                            ))} 
                            
                        </div>
                    </div>
                </div>  
            </>):
            <div></div>
            }
            <div>
                <div style={{background:"gainsboro", padding:"20px",borderRadius:"7px"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div className="text" style={{fontWeight:"500",fontSize:"35px"}}>{job}</div>
                        <div>
                        <button onClick={showApplication}>Ds Ứng viên</button>
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
                    <div>{require?require:'Không có yêu cầu thêm'}</div>
                    <div>{benefits?'Quyền lợi:'+benefits:""}</div>
                </div>
            </div>
            
            
        </div>
    )
}
export default PostApplication