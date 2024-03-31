'use client'
import React from 'react'
import Navbar from '@/app/components/Navbar'
import Result from '@/app/components/result'

function page() {
    const id = 2;
  return (
    <div>
      <Navbar/>
      <Result qid={id}/>
    </div>
  )
}

export default page
