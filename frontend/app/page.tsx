'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Quecard from "@/app/components/questionshowingcard";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

const Home:React.FC = ()=>{
  const router = useRouter()
  const token = localStorage.getItem('accessToken')
  const status = localStorage.getItem('status')
  const user = localStorage.getItem('user')
  if(!token){
    router.push('/Login')
  }
  let [Quizzes , setQuizzes] = useState([])
  let [givenquiz , setgivenquiz] = useState([])

  async function getquizzes (){
    try {
      let response = await axios.get('http://localhost:8000/getquizzes/')
      setQuizzes(response.data)
    } catch (error) {
      console.log('something goes wrong' , error)
    }
  }

  async function fetch(){
    try {
      let response = await axios.get('http://localhost:8000/api/yourquizes/',{
        headers :{
          'Authorization' : `${token}`
        }
      })
      let data = response.data
      console.log(data.quiz)
      setgivenquiz(data.quiz)
    } catch (error) {
      console.log('error from sever',error)
    }
  }

  useEffect(()=>{
    try {
      fetch()
      getquizzes()
    } catch (error) {
      console.log('error in fetching data',error)
      router.push('/Login')
    }
  },[])

  return (
    <div>
      <Navbar status={status} user={user}/>
      {Quizzes.map((e)=>{
        if (givenquiz.includes(e.quiz_name)) {
          return null;
        }
        return <Quecard key={e.id} quizname={e.quiz_name} quiztopic={e.quiz_topic} quizid={e.id} buttontext='take test'></Quecard>
      })}
    </div>
  )
}

export default Home