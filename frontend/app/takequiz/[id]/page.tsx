'use client'
import GivenQuuiz from "@/app/components/quiztakingcard";
import React from "react"

const Quiztaking : React.FC=()=>{
  const id = 2
  console.log(id)

  return (
    <GivenQuuiz qid={id}></GivenQuuiz>
  )
}

export default Quiztaking