'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'


interface Quizid {
    qid: number;
}

const Result: React.FC<Quizid> = (props) =>  {
    const [correct , setcorrect] = useState(0)
    const [selectedoption ,setselectedoption] = useState([])
    const [correctedoption ,setcorrectedoption] = useState([])
    const [questioned , setquestioned] = useState([])
    const token = localStorage.getItem('accessToken')
    const [msg , setmsg] = useState('')

    const fetch =async ()=>{
        let response = await axios.get(`http://localhost:8000/api/yourquizes/${props.qid}` , {
            headers : {
                'Authorization' : `${token}`
            }
        })
        if(response.status == 200){
            let data = response.data
            console.log(data)
            setcorrect(data.correct)
            setselectedoption(data.selectedoption)
            setcorrectedoption(data.correctoption)
            setquestioned(data.questioned)
        }
        else{
            setmsg(response.data.msg)
        }
    }
    useEffect(()=>{
        try {
            fetch()
        } catch (error) {
            console.log('error in getting result',error)
        }
    },[])
  return (
    <>
    {msg === '' ? (<div>
<div style={{backgroundColor:'pink' , padding:'1rem'}}>
  <b>YOU HAVE SCORED : {correct}</b>
</div>
{selectedoption.map((elem , index)=>{
  return <div style={{backgroundColor:'brown' , color:'white'}} key={index}>
      <p>{index +1}. {questioned[index]}</p>
      Response - Your answer is {elem} and correct answer is {correctedoption[index]}
  </div>
})}
</div>) : (
    <div>
        {msg}
    </div>
)}
    </>
    
  )
}

export default Result
