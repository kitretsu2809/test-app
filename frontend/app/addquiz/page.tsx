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
        <div>
            {!haveselected ? (
                <div>
                    <h4>Quiz Name</h4>
                    <input type='text' name="quizname" placeholder='Enter the quiz name' onChange={handleqchangename}/>
                    <h4>Quiz Topic</h4>
                    <input type='text' name="quiztopic" placeholder='Enter the topic' onChange={handletchangename}/>
                    <h4>Number of Questions</h4>
                    <input type='number' placeholder='Enter the number of questions you want to add' onChange={handleChange} />
                    <button onClick={handleClick}>Submit</button>
                </div>
            ) : (
                <div>
                    {addQuizComponents}
                    <button onClick={handleAddQuiz}>Add Quiz</button>
                </div>
            )}
        </div>
    );
}

export default Page;