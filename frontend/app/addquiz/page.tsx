'use client'
import React, { useState } from 'react';
import Addquiz from '../components/addquiz';

function Page() {
    const [numberquestion, setNumberquestion] = useState(0);
    let quizdata ={
        quizname : '',
        quiztopic : '',
        questions : []
    }
    const [haveselected, setHaveSelected] = useState(false);

    const handleFromChild = (data) => {
        quizdata.questions.push(data)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        quizdata[name] = value;
        setNumberquestion(value);
    };

    const handleClick = () => {
        setHaveSelected(true);
    };

    const handleAddQuiz = () => {
        // Here you can use quizdata, which contains data from all Addquiz components
        console.log(quizdata);
    };

    const addQuizComponents = Array.from({ length: numberquestion }, (_, index) => (
        <Addquiz key={index} senddata={handleFromChild} />
    ));

    return (
        <div>
            {!haveselected ? (
                <div>
                    <h4>Quiz Name</h4>
                    <input type='text' name="quizname" placeholder='Enter the quiz name' onChange={handleChange} />
                    <h4>Quiz Topic</h4>
                    <input type='text' name="quiztopic" placeholder='Enter the topic' onChange={handleChange} />
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