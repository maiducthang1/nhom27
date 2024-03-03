import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
const Company = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [srch, setSrch] = useState([]);
    //alert(cookies.user);
    async function goto(id) {
        console.log(id)
        navigate(`/CompanyDetail/${id}`);
    }
    useEffect(()=> {
        fetch("http://localhost:3001/company/getAllCompany")
        .then(res =>res.json())
        .then(data => {
            console.log(data[0])
            setData(data)
            setSrch(data)
        })
        // console.log(data);
    },[])
    const search = (event) => {
        // Access input value
        const query = event.target.value;
        // Create copy of item list
        var updatedList = [...srch];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
        return item.Name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        setData(updatedList);
      };
    return(
        <div style={{position:"absolute", left:"10%",top:"15%"}}>
            <div style={{display:"flex",paddingTop:"10px",paddingBottom:"5%"}}>
                <input type="text" className="search" onChange={search}/>
                <button onClick={search} className="text" style={{borderRadius:"10px",border:"none",fontWeight:"bold"}}>Tìm kiếm</button>
            </div>
            <div style={{left: "50%",position: "relative",padding: "20px",width: "200%"}}>
            {data.map(dataa => (  
                // onClick={()=>goto(dataa.Id)}
                <div onClick={()=>goto(dataa.Id[0])} key={dataa.Id[0]} style={{background: "whitesmoke",
                    borderRadius: "10px",margin:"10px 0px"}}>
                
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <div style={{width:"50px",height:"50px",position:"relative",padding:"10px"}}>
                            <img className="icon-fit"src={dataa.image?process.env.PUBLIC_URL+dataa.image:process.env.PUBLIC_URL+"/company.jpeg"} alt="" />
                        </div>
                        <div style={{position:"relative",margin:"5px"}}>
                            <div className="titleinvite">{dataa.Name}</div>
                            <div style={{float:"left"}}>{dataa.Contact?dataa.Contact:'Liên hệ: Chưa có liên hệ'}</div>
                            <br />
                            <div className="longaddress">Địa chỉ: {dataa.Address}</div>
                        </div>
                        
                    </div>
                </div>
            ))}
                
            </div>
        </div>
    )
}
export default Company