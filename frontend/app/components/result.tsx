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
    const token = localStorage.getItem('accessToken')

    const fetch =async ()=>{
        let response = await axios.get(`http://localhost:8000/api/yourquizes/${props.qid}` , {
            headers : {
                'Authorization' : `${token}`
            }
        })
        let data = response.data
        console.log(data)
        setcorrect(data.correct)
        setselectedoption(data.selectedoption)
        setcorrectedoption(data.correctoption)
    }
    useEffect(()=>{
        try {
            fetch()
        } catch (error) {
            console.log('error in getting result',error)
        }
    },[])
  return (
    <div>
      <div style={{backgroundColor:'pink' , padding:'1rem'}}>
        <b>YOU HAVE SCORED : {correct}</b>
      </div>
      {selectedoption.map((elem , index)=>{
        return <div style={{backgroundColor:'brown' , color:'white'}} key={index}>
            {index + 1}. Your answer is {elem} and correct answer is {correctedoption[index]}
        </div>
      })}
    </div>
  )
}

export default Result
