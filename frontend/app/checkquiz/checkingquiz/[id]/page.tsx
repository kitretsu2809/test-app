'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Checking = ({params}:{params : {id : string}})=>{
    const id = params.id
    const quizid = Number.parseInt(id)
    const token = localStorage.getItem('accessToken')
    const [response , setresponse] = useState([])

    const fetch =async ()=>{
        let result = await axios.get(`http://localhost:8000/api/checkquiz/${quizid}/` , {
            headers : {
                'Authorization' : `${token}`
            }
        })
        console.log(result.data)

    }

    useEffect(()=>{
        try {
            fetch()
        } catch (error) {
            console.log('error in fetching data ' , error)
        }
    },[])
  return (
    <div>
      hello from site
    </div>
  )
}

export default Checking
