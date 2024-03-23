'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";


const Home:React.FC = ()=>{
  let [Quizzes , setQuizzes] = useState([])

  async function getquizzes (){
    try {
      let response = await axios.get('http://localhost:8000/getquizzes/')
      setQuizzes(response.data)
    } catch (error) {
      console.log('something goes wrong' , error)
    }
  }

  useEffect(()=>{
    getquizzes()
  },[])

  return (
    <div>
      {Quizzes.map((e)=>{
        return (<div key={e.id}>
          QuizName = {e.quiz_name}
          QuizTopic = {e.quiz_topic}
        </div>)
      })}
    </div>
  )
}

export default Home