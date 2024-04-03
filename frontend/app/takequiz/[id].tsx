'use client'
import GivenQuuiz from "@/app/components/quiztakingcard";
import React from "react"
import { useRouter } from "next/router";
const Quiztaking : React.FC=()=>{
  const router = useRouter();
  const { id } = router.query;
  return (
    <GivenQuuiz qid={id}></GivenQuuiz>
  )
}

export default Quiztaking