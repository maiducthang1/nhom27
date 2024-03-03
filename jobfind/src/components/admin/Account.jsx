import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sendmail from "../other/SendMail";
import { callError, callSuccess } from "../errorLibrary/call.mjs";
const Account = () => {
    const [listacc, setListAcc] = useState([]);
    const [defaultlist, setDefaultList] = useState([]);
    const [listsearch, setListSearch] = useState([]);
    const [activeTab, setActiveTab] = useState("tab1");
    const [searchinput, setInput] = useState('');
    const [chana, setChana] = useState('');
    const navigate = useNavigate();
    const setActiveFilter = async (which) => {
        setActiveTab(which)
        var updatedList = [...defaultlist];
        setInput('');
        if(which=='tab2'){
            updatedList = updatedList.filter((item) => {

            return (item.Id_Role+'').indexOf('3') !== -1;
            }); 
        } else if(which=='tab3'){
            updatedList = updatedList.filter((item) => {
            return (item.Id_Role+'').indexOf('2') !== -1;
            });
        } else if(which=='tab4'){
            updatedList = updatedList.filter((item) => {
            return (item.Status+'').toLowerCase().indexOf('0'.toLowerCase()) !== -1;
            });
        } else if(which=='tab5'){
            updatedList = updatedList.filter((item) => {
            return (item.Status+'').toLowerCase().indexOf('1'.toLowerCase()) !== -1;
            });
        }
        setListAcc(updatedList); 
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
        return item.Name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        setListAcc(updatedList);
    }
    const chan = async (id) => {
        let result = await fetch(
            `http://localhost:3001/admin/changeStatus/${id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            },
        ).then(res =>res.json())
        .then(data => {
            if(data){
                callSuccess('Đổi thành công')
                fetch(`http://localhost:3001/admin/getAllAccount`)
                    .then(res =>res.json())
                    .then(data => {
                        console.log(data[0])
                        setListAcc(data);
                        setDefaultList(data);
                    })
            }
            else {callError('Lưu thất bại');
        }})
    }
    function xacnhan (id,state){
        if(state==1){
            if(chana!=id)
            setChana(id)
            else setChana('')
        }
        else if (state ==2)
        chan(id);
    }
    useEffect(()=>{
        fetch(`http://localhost:3001/admin/getAllAccount`)
        .then(res =>res.json())
        .then(data => {
            console.log(data[0])
            setListAcc(data);
            setDefaultList(data);
        })
    },[])
    return(
        <div style={{marginLeft:"20%"}}>
            <div style={{width:"100%"}}>
                <div style={{position:'fixed'}}>
                <h2>Danh sách tài khoản</h2>
                <div style={{}}>
                    <button className={activeTab === "tab1" ? "activeTab " : ""} onClick={()=>setActiveFilter('tab1')}>Tất cả</button>
                    <button className={activeTab === "tab2" ? "activeTab " : ""} onClick={()=>setActiveFilter('tab2')}>Công ty</button>
                    <button className={activeTab === "tab3" ? "activeTab " : ""} onClick={()=>setActiveFilter('tab3')}>Ứng viên</button>
                    <button className={activeTab === "tab4" ? "activeTab " : ""} onClick={()=>setActiveFilter('tab4')}>Còn hoạt động</button>
                    <button className={activeTab === "tab5" ? "activeTab " : ""} onClick={()=>setActiveFilter('tab5')}>Đã ngưng</button>
                </div>
                <div style={{display:"flex",paddingTop:"10px"}}>
                <input type="text" value={searchinput} className="search" onChange={search}/>
                {/* <button onClick={search} className="text" style={{borderRadius:"10px",border:"none",fontWeight:"bold"}}>Tìm kiếm</button> */}
                </div>
                </div>
                <br />
                <div style={{overflowY:"auto",marginTop:'130px',height:'500px',position:'relative'}}>
                {listacc.map(lista => (
                    <div className="listjob" key={lista.Id} style={{display:'flex',justifyContent:'space-between'}}>
                        
                        <div>
                            <div style={{display:"flex"}}>Tên: {lista.Name}</div>
                            <br />
                            <div style={{display:"flex"}}>Email: {lista.Email}</div>
                            <br />
                            <div style={{display:"flex"}}>Trạng thái: {lista.Status==0?'Còn hoạt đông':'Đã ngưng'}</div>
                            <br />
                            <div style={{display:"flex"}}>Đối tượng: {lista.Id_Role==3?'Công Ty':lista.Id_Role==2?'Ứng viên':'Admin'}</div>
                            <br />
                        </div>
                        {chana==lista.Id[0] ? ( <>
                            <div style={{position: 'fixed',padding: '20px',marginLeft: '10%',top: '8%',background:'#D9D9D9',width:'20%',zIndex:'1'}}>
                                
                                <button onClick={()=>xacnhan(lista.Id[0],1)}>Huỷ</button>
                                <div>Bạn có chắc?</div>
                                <button onClick={()=>xacnhan(lista.Id[0],2)}>{lista.Status==0?'Chặn':'Huỷ chặn'}</button>
                            </div>   
                            </>):
                            <div> <button onClick={()=>xacnhan(lista.Id[0],1)}>{lista.Status==0?'Chặn':'Huỷ chặn'}</button></div>  
                        }
                        
                    {/* <div style={{display:"flex"}}>: {post.Address}</div> */}
                    </div>
                ))}
                </div>
            </div>

        </div>
    )
}
export default Account;