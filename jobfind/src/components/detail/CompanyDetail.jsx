import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const CompanyDetail = () => {
    const {Id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [post, setPost] = useState([]);
    async function goto(id) {
        console.log(id)
        navigate(`/RecuitDetail/${id}`);
    }
    useEffect(()=> {
        fetch(`http://localhost:3001/company/getOneDetail/${Id}`)
        .then(res =>res.json())
        .then(data => {
            console.log(data)
            setData(data);
        })
        fetch(`http://localhost:3001/company/getAllPostThisCompany/${Id}`)
        .then(res =>res.json())
        .then(data => {
            console.log(data)
            setPost(data);
        })
    },[])
    return(
        <div style={{position:"relative", left:"15%",width:"70%",margin:"20px"}}>
            <div>
            {data.map(dataa => (
                <div style={{background:"gainsboro", padding:"20px",borderRadius:"7px"}}>
                
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <div style={{width:"60px",height:"60px",margin:"5px"}}><img className="icon-fit"src={process.env.PUBLIC_URL+"/company.jpeg"} alt="" /></div>
                        <div className="text" style={{fontWeight:"500",fontSize:"35px"}}>{dataa.Name}</div>
                    </div>
                    <div style={{display:"table",lineHeight:'0px'}}>
                        <div style={{display:'flex'}}><h3 className="text">Giới thiệu: {dataa.Description?dataa.Description:"Chưa có giới thiệu"}</h3></div>
                        <br />
                        <div style={{display:'flex'}}><h3 className="text">Liên lạc: {dataa.Contact?dataa.Contact:"Chưa có liên lạc"}</h3></div>
                        <br />
                        <div style={{display:'flex'}}><h3 className="text">Trụ sở: {dataa.Address?dataa.Address:"Chưa có địa chỉ"}</h3></div>
                    </div>
                </div>
            ))}
                <div style={{background:"gainsboro",marginTop:"20px",borderRadius:"10px",padding:"10px"}}><h2> Danh sách các bài đăng </h2> 
                {post.map(post => (
                    <div className="listjob" onClick={()=>goto(post.Id)} key={post.Id}>
                        <div style={{display:"flex"}}>Công việc: {post.Job}</div>
                        <br />
                        <div style={{display:"flex"}}>Lương: {post.Salary}tr</div>
                        <br />
                        <div style={{display:"flex"}}>Địa chỉ: {post.Address}</div>
                    </div>
                ))} 
                </div>
            </div>
            
        </div>
    )
}
export default CompanyDetail