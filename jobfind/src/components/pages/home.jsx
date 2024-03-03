import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [fdata, setFData] = useState([]);
    const [srch, setSrch] = useState([]);
    const [jfilter, setJfilter] = useState([]);
    const [job, setJob] = useState([]);
    const [searchinput, setInput] = useState('');
    //alert(cookies.user);
    async function goto(id) {
        
        navigate(`/RecuitDetail/${id}`);
    }
    useEffect(()=> {
        fetch("http://localhost:3001/jobfinder/post")
        .then(res =>res.json())
        .then(data => {
            // console.log(data.result)
            setData(data.result)
            setSrch(data.result)
            setJfilter(data.result)
            setFData(data.result)
        })
        fetch("http://localhost:3001/jobfinder/job")
        .then(res =>res.json())
        .then(data => {
            // console.log(data.result)
            setJob(data)
        })
        // console.log(data);
    },[])
    const search = (event) => {
        // Access input value
        const query = event.target.value;
        var updatedList = [...jfilter];
        setInput(query)
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
        return item.Job.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        setData(updatedList);
    };
    const laygiatri = (event) => {
        const query = event.target.value;
        setInput('')
        var updatedList = [...srch];
        // Include all elements which includes the search query
        if(query!='none')
        updatedList = updatedList.filter((item) => {
        return item.Job.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        setData(updatedList);
        setJfilter(updatedList);
    };
    return(
        <div style={{position:"absolute", left:"10%",top:"15%"}}>
            <div style={{display:"flex",paddingTop:"10px",paddingBottom:"5%"}}>
                <input value={searchinput} type="text" className="search" onChange={search}/>
                <button className="text" style={{borderRadius:"10px",border:"none",fontWeight:"bold"}}>Tìm kiếm</button>
                <div style={{width:'180px',fontWeight:'600',color:'#5C1010',position:'relative',top: '5px'}}>Lọc theo công việc:</div>
                <div style={{width:'20px',position:'relative'}}>
                <select id="ddlViewBy" onChange={laygiatri} style={{borderRadius:"10px",border:"none",fontWeight:"bold",width:'100px',height:'30px'}}>
                    <option value="none"  selected>Tất cả</option>
                    {job.map(joba => (
                        <option value={joba.Name}>{joba.Name}</option>
                    ))}
                </select>
                </div>
            </div>
            <div className="gridContainer">
            {data.map(dataa => (  
                // onClick={()=>goto(dataa.Id)}
                <div onClick={()=>goto(dataa.Id)} key={dataa.Id}>
                
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <div className="miniicon">
                            <img className="icon-fit"src={process.env.PUBLIC_URL+"/company.jpeg"} alt="" />
                        </div>
                        <div className="leftinvite">
                            <div className="titleinvite">{dataa.Job}</div>
                            <div style={{float:"left"}}>{dataa.Company}</div>
                        </div>
                        
                    </div>
                    <div className="itemline"></div>
                    <div className="salaryplace">
                        <div className="graywarp">{dataa.Salary}tr</div>
                        <div className="graywarp address">{dataa.Address}</div>
                    </div>
                
                </div>
            ))}
                {/* <div>item 2</div>
                <div>item 3</div>
                <div>item 4</div>
                <div>item 5</div>
                <div>item 6</div>
                <div>item 7</div>
                <div>item 8</div>
                <div>item 9</div> */}
            </div>
        </div>
    )
}
export default Home