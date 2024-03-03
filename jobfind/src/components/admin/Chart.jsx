import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { callError } from "../errorLibrary/call.mjs";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend
);
const Chart = () => {
    const [chart, setChart] = useState([]);
    const [dateStart, setDateS] = useState(null);
    const [dateEnd, setDateE] = useState(null);
    useEffect(()=>{
        
    },[])
    const data = {
        labels : chart.map((char)=>char.DateTerm.split("T")[0]),
        datasets: [
          {
            label: 'Số bài post theo ngày',
            data: chart.map((char)=>char.COUNT),
            borderColor: 'rgb(60, 235, 85)',
            backgroundColor: 'rgba(60, 170, 85, 0.8)',
          }
        ],
    }
    const options = {
        plugins:{
            legend: true
        },
        scales:{
            y:{

            }
        }
    }
    const show = () => {
        console.log(dateStart+" and "+dateEnd)
        if (dateStart>dateEnd){
            callError('Ngày bắt đầu không thể bé hơn ngày kết thúc')
        } else {
            fetch(`http://localhost:3001/admin/getChart/${dateStart}/${dateEnd}`)
            .then(res =>res.json())
            .then(data => {
                console.log(data[0])
                setChart(data);
            })
        }
    }
    return(
        <div style={{marginLeft:"20%"}}>
            <div style={{position:"fixed",zIndex:"1",width:"25%"}}>
            <div><input type="date" value={dateStart} onChange={(e) =>setDateS(e.target.value)}/></div>
            <div><input type="date" value={dateEnd} onChange={(e) =>setDateE(e.target.value)}/></div>
            <button onClick={show}> Show</button>
            <div style={{background:'white',boxShadow: '5px 5px 5px gray',borderRadius:'5px'}}>
            <Line options={options} data={data}></Line>
            </div>
            </div>

        </div>
    )
}
export default Chart;