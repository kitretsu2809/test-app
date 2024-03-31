'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'


interface Quizid {
    qid: number;
}

const Result: React.FC<Quizid> = (props) =>  {
    const [correct , setcorrect] = useState(0)
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
      you have scored : {correct}
    </div>
  )
}

export default Result
