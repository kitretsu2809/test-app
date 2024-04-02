'use client'
import GivenQuuiz from "@/app/components/quiztakingcard";

const Quiztaking = ({params}:{params : {id : string}})=>{
  const id = params.id
  Number.parseInt(id)
  console.log(id)
  
  return (
    <GivenQuuiz qid={Number.parseInt(id)}></GivenQuuiz>
  )
}

export default Quiztaking