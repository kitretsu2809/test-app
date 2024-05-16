'use client'
import React,{useState , useEffect, use} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Quecard from '../components/questionshowingcard'
function Check() {
  const token = localStorage.getItem('accessToken')
  const router = useRouter()
  if(!token){
    router.push('/Login')
  }
  let [Quizzes , setQuizzes] = useState([])

  async function getquizzes (){
    try {
      let response = await axios.get('http://localhost:8000/api/checkquiz/' ,{
        headers : {
            'Authorization' : `${token}`
        }
      })
      console.log(response.data)
      setQuizzes(response.data)
    } catch (error) {
      console.log('something goes wrong' , error)
    }
  }

  useEffect(()=>{
    try {
        getquizzes()
    } catch (error) {
        console.log('error in fetching data ' , error)
    }
  },[])
  return (
    <div>
      {Quizzes.map((e)=>{
        return <Quecard key={e.id} quizname={e.quiz_name} quiztopic={e.quiz_topic} quizid={e.id} buttontext='check test'></Quecard>
      })}
    </div>
  )
}

export default Check
