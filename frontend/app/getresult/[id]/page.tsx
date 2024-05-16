'use client'
import React from 'react'
import Navbar from '@/app/components/Navbar'
import Result from '@/app/components/result'


const Results = ({params}:{params : {id : string}})=> {
  const id = params.id
  console.log("a",id)

  return (
      <Result qid={Number.parseInt(id)}/>
    
  )
}

export default Results;
