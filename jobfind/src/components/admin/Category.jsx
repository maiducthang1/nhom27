import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Category = () => {
    const [category, setCategory] = useState([]);
    const [editCate,setEdit]=useState('');
    const [editName,setName]=useState('');
    const [editStatus,setStatus]=useState('true');
    useEffect(()=>{
        fetch(`http://localhost:3001/admin/getCategory`)
        .then(res =>res.json())
        .then(data => {
            console.log(data[0])
            
            setCategory(data);
            
        })
    },[])
    const allowedit = async (key,name,status) => {    
        if(editCate == key){
        setEdit('');
        }
        else
        setEdit(key);
        setName(name);
        setStatus(status);
    }
    const saveedit = async (id) => {
        console.log(editName+''+editStatus)
        var dataa = {Name: editName,Status: editStatus}
        let result = await fetch(
            `http://localhost:3001/admin/save/${id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
              body: JSON.stringify(dataa),
            },
        ).then(res =>res.json())
        .then(data => {
            if(data){
                alert('Lưu thành công')
                fetch(`http://localhost:3001/admin/getCategory`)
                    .then(res =>res.json())
                    .then(data => {
                        console.log(data[0])
                        setCategory(data);
                    })
            }
            else {alert('Lưu thất bại');
        }})
    }
    return(
        <div style={{marginLeft:"20%"}}>
            <div style={{}}>
                <div style={{position:'fixed'}}>
                <h2>Danh mục công việc</h2>
                
                
                {editCate=='new' ? ( <>
                            <div style={{position: 'fixed',padding: '20px',marginLeft: '30%',top: '8%',background:'#D9D9D9',zIndex:'1'}}>
                                
                                <button onClick={()=>allowedit('new','','')}>Thoát</button>
                                <div>
                                    <input type="text" value={editName} onChange={(e)=>setName(e.target.value)}/>
                                    <select id="cateView" defaultValue={'true'} onChange={(e)=>setStatus(e.target.value)}>
                                        <option value='true' id='true'selected>Hoạt động</option>
                                        <option value='false' id='false'>Ngưng</option>
                                    </select>
                                </div>
                                <button onClick={()=>saveedit('new')}>Lưu</button>
                            </div>   
                            </>):
                            <div><button onClick={()=>allowedit('new','','')}>Thêm mới</button></div>   
                        }
                
                </div>
                <br />
                <div style={{overflowY:"auto",marginTop:'130px',height:'500px',position:'relative'}}> 
                {category.map(lista => (
                    <div className="listjob" key={lista.Id} style={{display:'flex',justifyContent:'space-between'}}>
                        <div>
                            <div style={{display:"flex"}}>Tên: {lista.Name}</div>
                            <br />
                            <div style={{display:"flex"}}>Trạng thái: {lista.Status?'Đang hoạt động':'Đã ngưng'}</div>
                            <br />
                        </div>
                        {editCate!=lista.Id ? ( <>
                            <div> <button onClick={()=>allowedit(lista.Id,lista.Name,lista.Status)}>Sửa</button></div>
                            </>):
                            <div style={{position: 'fixed',padding: '20px',marginLeft: '30%',top: '8%',background:'#D9D9D9'}}>
                                <button onClick={()=>allowedit(lista.Id,'','')}>Thoát</button>
                                <div>
                                    <input type="text" value={editName} onChange={(e)=>setName(e.target.value)}/>
                                    <select id="cateView" defaultValue={lista.Status} onChange={(e)=>setStatus(e.target.value)}>
                                        <option value='true' id='true'selected>Hoạt động</option>
                                        <option value='false' id='false'>Ngưng</option>
                                    </select>
                                </div>
                                <button onClick={()=>saveedit(lista.Id)}>Lưu</button>
                            </div>         
                        }
                    {/* <div style={{display:"flex"}}>: {post.Address}</div> */}
                    </div>
                ))}
                    
                </div>
            </div>

        </div>
    )
}
export default Category;