'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Addquiz from '../components/addquiz';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter()
    const token = localStorage.getItem('accessToken')
    const [numberquestion, setNumberquestion] = useState(0);
    let [questionname , setquestionname] = useState('')
    let [quiztopicname , setquiztopicname] = useState('')
    let quizdata = {
        quizname : questionname,
        quiztopic : quiztopicname,
        questions : []
    }
    const [haveselected, setHaveSelected] = useState(false);

    const handleFromChild = (data) => {
        quizdata.questions.push(data)
    };

    const handleChange = (e) => {
        setNumberquestion(e.target.value);
    };

    const handleqchangename = (e)=>{
        setquestionname(e.target.value)
    }
    const handletchangename = (e)=>{
        setquiztopicname(e.target.value)
    }

    const handleClick = () => {
        setHaveSelected(true);
    };

    const handleAddQuiz =async () => {
        try {
            let response = await axios.post('http://localhost:8000/api/addquiz/' , quizdata , {
                headers : {
                    'Authorization' : `${token}`
                }
            })
            console.log(response.data)
            alert('quiz added successfully')
            router.push('/')
        } catch (error) {
            console.log('error in sending addquiz data' , error)
        }
    };

    const addQuizComponents = Array.from({ length: numberquestion }, (_, index) => (
        <Addquiz key={index} senddata={handleFromChild} />
    ));

    return (
        <div className="bg-gray-100 p-4">
  {!haveselected ? (
    <div>
      <h4 className="text-lg font-semibold">Quiz Name</h4>
      <input
        type="text"
        name="quizname"
        placeholder="Enter the quiz name"
        onChange={handleqchangename}
        className="w-full p-2 mt-2 border rounded-md"
      />
      <h4 className="text-lg font-semibold mt-4">Quiz Topic</h4>
      <input
        type="text"
        name="quiztopic"
        placeholder="Enter the topic"
        onChange={handletchangename}
        className="w-full p-2 mt-2 border rounded-md"
      />
      <h4 className="text-lg font-semibold mt-4">Number of Questions</h4>
      <input
        type="number"
        placeholder="Enter the number of questions you want to add"
        onChange={handleChange}
        className="w-full p-2 mt-2 border rounded-md"
      />
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Submit
      </button>
    </div>
  ) : (
    <div>
      {addQuizComponents}
      <button
        onClick={handleAddQuiz}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Add Quiz
      </button>
    </div>
  )}
</div>

    );
}

export default Page;