import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { callError, callSuccess } from "../errorLibrary/call.mjs";
import { baoloi } from "../errorLibrary/allError.mjs";

const Self = () => {
    const [ten, setTen] = useState(null);
    const [address, setAddress] = useState(null);
    const [email, setEmail] = useState(null);
    const [description, setDescription] = useState(null);
    const [level, setLevel] = useState(null);
    const [bio, setBio] = useState(null);
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [data,setData] = useState('');
    const [appli,setAppli] = useState([]);
    const navigate = useNavigate();
    const handleSubmission = () => {
		const formData = new FormData();
		formData.append('File', selectedFile);
        console.log(formData)
        if(selectedFile.size >= (1024**20)){
            callError(baoloi.selfImageLimit)
        }else if(selectedFile.type.indexOf('image')==-1){
            callError(baoloi.selfImageFile)
        }
        else{
		fetch(`http://localhost:3001/jobfinder/upload/${cookies.user}`,
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
				console.log('Success:', result.filePath);
                document.getElementById('avatar').src = process.env.PUBLIC_URL+result.filePath
			})
			.catch((error) => {
				console.error('Error:', error);
			});
        }
	};
    
    useEffect(()=> {
        fetch(`http://localhost:3001/jobfinder/accountdetail/${cookies.user}`)
        .then(res =>res.json())
        .then(data => {
            setData(data[1][0])
            setAddress(data[1][0].Address)
            setEmail(data[1][0].Email)
            setDescription(data[1][0].Description)
            setLevel(data[1][0].Level)
            setBio(data[1][0].Bio)
            setAge(data[1][0].Age)
            setGender(data[1][0].Gender)
            if(data[1][0].Gender != null)
            if(data[1][0].Gender == true)
            document.getElementById('male').checked=true;
            else document.getElementById('female').checked=true;
        })
        fetch(`http://localhost:3001/jobfinder/getAllMyAppli/${cookies.user}`)
        .then(res =>res.json())
        .then(data => {
            console.log("haha")
            console.log(data)
            if(data){
            setAppli(data);
            }
        })
        
    },[]) 

    function checkinput (){
        // if (ten.trim().length == 0)
        // toast.error('Bạn chưa nhập tên',{
        //     position: toast.POSITION.TOP_RIGHT
        // }); 
        // else if (taikhoan.trim().length == 0) 
        // toast.error('Bạn chưa nhập tài khoản',{
        //     position: toast.POSITION.TOP_RIGHT
        // }); 
        // else return true
        // return false
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        var dataa = {Username: ten,Address: address,Email: email, Description:description, Level: level,Bio:bio,Age:age,Gender:gender}
        if(email.trim().length == 0)
        callError(baoloi.selfEmail)
        else if(age<=5){
        callError(baoloi.selfAge)
        } else {
        let result = await 
        fetch(`http://localhost:3001/jobfinder/saveinfo/${cookies.user}`,
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
            if(data.result){
                callSuccess(baoloi.selfSuccess)
                navigate("/User");
            }
            else {alert('Lưu thất bại');
            }})}
    }
    return(
        <div style={{position:"relative", display: "grid", justifyContent: "normal"}}>
            <div style={{background:"#C4BEBE",position:"relative", margin:"5%", fontSize:"30px",borderRadius:"10px"}}>
            <div style={{display:"flex", justifyContent:"flex-start"}}>
                
                <div style={{padding:"30px",width:"180px"}}>
                    <div style={{width:"80px",height:"80px"}}><img style={{borderRadius:"100%"}} id="avatar" className="icon-fit"src={data.Image?process.env.PUBLIC_URL+data.Image:process.env.PUBLIC_URL+"/company.jpeg"} alt="" /></div>
                    <label For="fileinput">+</label><br />
                    <input style={{display:"none"}} id="fileinput" type="file" name="file" accept="image/*" onChange={(e)=>{setSelectedFile(e.target.files[0])}}/>
                    <button onClick={handleSubmission}>Lưu ảnh</button>
                </div>
                <form action="/" onSubmit={onSubmit}>
                <div>
                    <table>
                        <tr>
                            <th>Tên</th>
                            <th style={{paddingLeft:"80px"}}>{data.Name}</th>
                        </tr>
                        <tr>
                            <td><div>Địa chỉ</div></td>
                            <td><div><input type="text" value={address} onChange={(e) =>setAddress(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Email</div></td>
                            <td><div><input type="email" value={email} onChange={(e) =>setEmail(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Mô tả bản thân</div></td>
                            <td><div><input type="text" value={description} onChange={(e) =>setDescription(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Trình độ học vấn</div></td>
                            <td><div><input type="text" value={level} onChange={(e) =>setLevel(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Tiểu sử</div></td>
                            <td><div><input type="text" value={bio} onChange={(e) =>setBio(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Tuổi</div></td>
                            <td><div><input type="number" value={age} onChange={(e) =>setAge(e.target.value)}/></div></td>
                        </tr>
                        <tr>
                            <td><div>Giới tính</div></td>
                            <td><div style={{marginBottom:"10px"}} onChange={(e) =>setGender(e.target.value)}>
                                <input className="optionbtn" type="radio" value="flase" name="gender" id="male" /> Nam
                                <input className="optionbtn" type="radio" value="true" name="gender" id="female"/> Nữ
                            </div></td>
                        </tr>
                    </table>
            
                </div>
                <div style={{display:"flex", justifyContent:"flex-end", margin:"10px"}}><button type="submit">Lưu</button></div>
                </form>
                </div>
                <div style={{background:"gainsboro",marginTop:"20px",borderRadius:"0px 0px 10px 10px;",padding:"10px"}}>
                <div style={{justifyContent: "space-between",display: "flex",margin: "0px 110px"}}>
                    <h2> Danh sách các bài tuyển dụng đã nộp </h2>
                </div>
                {appli.map(post => (
                    <div className="listjob" key={post.Id}>
                        <div>
                            <div style={{display:"flex"}}>Công việc: {post.Job}</div>
                            <br />
                            <div style={{display:"flex"}}>Lương: {post.Salary}tr</div>
                            <br />
                            <div style={{display:"flex"}}>Địa chỉ: {post.Address}</div>
                        </div>
                        <div>
                            <div>{post.Checked==0?'Chưa xem qua':'Đã được xem qua'}</div>
                        </div>
                        
                    </div>
                ))} 
                </div>
            </div>
            
            
        </div>
    )
}
export default Self