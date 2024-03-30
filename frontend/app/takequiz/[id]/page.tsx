'use client'
import GivenQuuiz from "@/app/components/quiztakingcard";
import React from "react";
import { useRouter } from "next/router";

const Quiztaking : React.FC=()=>{
  const id = 1
  console.log(id)

  return (
    <GivenQuuiz qid={id}></GivenQuuiz>
  )
}

export default Quiztaking