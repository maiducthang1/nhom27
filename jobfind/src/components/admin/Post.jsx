import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Post = () => {
    const [listpost, setListPost] = useState([]);
    const [defaultlist, setDefaultList] = useState([]);
    const [listsearch, setListSearch] = useState([]);
    const [activeTab, setActiveTab] = useState("tab1");
    const [searchinput, setInput] = useState('');
    const setActiveFilter = async (which) => {
        setActiveTab(which)
        var updatedList = [...defaultlist];
        setInput('');
        if(which=='tab2'){
            updatedList = updatedList.filter((item) => {

            return (item.Status+'').indexOf('1') !== -1;
            }); 
        } else if(which=='tab3'){
            updatedList = updatedList.filter((item) => {
            return (item.Status+'').indexOf('0') !== -1;
            });
        } else if(which=='tab4'){
            updatedList = updatedList.filter((item) => {
            return (item.Status+'').indexOf('2') !== -1;
            });
        } 
        setListPost(updatedList); 
        setListSearch(updatedList);
    }
    const search = (event) => {
        // Access input value
        const query = event.target.value;
        // Create copy of item list
        setInput(query);
        var updatedList = [...listsearch];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
        return item.Job.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        setListPost(updatedList);
    }
    function daytoday () {
        const datee = new Date();

        let currentDay= String(datee.getDate()).padStart(2, '0');

        let currentMonth = String(datee.getMonth()+1).padStart(2,"0");

        let currentYear = datee.getFullYear()
        var homnay = currentYear+"-"+currentMonth+"-"+currentDay
        return homnay;
    }
    useEffect(()=>{
        fetch(`http://localhost:3001/admin/getPost`)
        .then(res =>res.json())
        .then(data => {
            
            setListPost(data.result);
            setDefaultList(data.result);
        })
        fetch(`http://localhost:3001/admin/updatePost`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            },
        )
    },[])
    return(
        <div style={{marginLeft:"20%"}}>
            <div style={{}}>
                <div style={{position:'fixed'}}>
                <h2>Danh sách bài tuyển dụng</h2>
                <div style={{}}>
                    <button className={activeTab === "tab1" ? "activeTab " : ""} onClick={()=>setActiveFilter('tab1')}>Tất cả</button>
                    <button className={activeTab === "tab2" ? "activeTab " : ""} onClick={()=>setActiveFilter('tab2')}>Chờ duyệt</button>
                    <button className={activeTab === "tab3" ? "activeTab " : ""} onClick={()=>setActiveFilter('tab3')}>Hoạt động</button>
                    <button className={activeTab === "tab4" ? "activeTab " : ""} onClick={()=>setActiveFilter('tab4')}>Đã ngưng</button>
                </div>
                <div style={{display:"flex",paddingTop:"10px"}}>
                <input type="text" value={searchinput} className="search" onChange={search}/>
                {/* <button onClick={search} className="text" style={{borderRadius:"10px",border:"none",fontWeight:"bold"}}>Tìm kiếm</button> */}
                </div>
                </div>
                <br />
                <div style={{overflowY:"auto",marginTop:'130px',height:'500px',position:'relative'}}>
                {listpost.map(lista => (
                    <div className="listjob" key={lista.Id} style={{display:'flex',justifyContent:'space-between'}}>
                        <div>
                            <div style={{display:"flex"}}>Tên: {lista.Job}</div>
                            <br />
                            <div style={{display:"flex"}}>Công ty: {lista.Company}</div>
                            <br />
                            <div style={{display:"flex"}}>Trạng thái: {lista.Status==0?'Đang hoạt động':lista.Status==1?'Chờ duyệt':'Đã ngưng'}</div>
                            <br />
                        </div>
                        <div> <button style={lista.DateTerm.split("T")[0]>=daytoday()?{display:'block'}:{display:'none'}}>{lista.Status==0?'Dừng':lista.Status==1?'Chấp Thuận':'Huỷ dừng'}</button></div>
                    {/* <div style={{display:"flex"}}>: {post.Address}</div> */}
                    </div>
                ))}
                </div>
            </div>

        </div>
    )
}
export default Post;