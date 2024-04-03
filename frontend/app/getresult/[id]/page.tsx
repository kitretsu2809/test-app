'use client'
import React from 'react'
import Navbar from '@/app/components/Navbar'
import Result from '@/app/components/result'
import { useRouter } from "next/router";
function page() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Navbar/>
      <Result qid={id}/>
    </div>
  )
}

export default page
