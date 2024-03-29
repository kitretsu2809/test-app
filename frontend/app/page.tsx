'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Quecard from "@/app/components/questionshowingcard";
import Navbar from "./components/Navbar";


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
      <Navbar/>
      {Quizzes.map((e)=>{
        return <Quecard key={e.id} quizname={e.quiz_name} quiztopic={e.quiz_topic} quizid={e.id} buttontext='take test'></Quecard>
      })}
    </div>
  )
}

export default Home