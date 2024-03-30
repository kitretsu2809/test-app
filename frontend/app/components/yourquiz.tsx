'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Quecard from "@/app/components/questionshowingcard";
import { useRouter } from 'next/navigation';

export default function YourQuiz() {
    const router = useRouter()
    const token = localStorage.getItem('accessToken')
    const [quiz,setquiz] = useState([])

    async function fetch(){
        let response = await axios.get('http://localhost:8000/api/yourquizes/',{
            headers :{
                'Authorization' : `${token}`
            }
        })
        let data = response.data
        console.log(data)
        setquiz(data)
    }

    useEffect(()=>{
        try {
            fetch()
        } catch (error) {
            console.log('error in fetching data',error)
            router.push('/Login')
        }
    },[])
  return (
    <div>
      {quiz.map((elem)=>{
        return <Quecard key={elem.id} quizname={elem.quiz_name} quiztopic={elem.quiz_topic} quizid={elem.id} buttontext='view result'></Quecard>
      })}
    </div>
  )
}