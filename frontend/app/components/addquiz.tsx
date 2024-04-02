'use client'
import React, { useState } from 'react';

function Addquiz({ senddata }) {
    const [type, setType] = useState('single_correct');
    const [question, setQuestion] = useState('');
    let [haveclicked , sethaveclicked] = useState(false)
    const [options, setOptions] = useState({
        option1: '',
        option2: '',
        option3: '',
        correctOption: ''
    });
    const [integerValue, setIntegerValue] = useState('');

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleOptionChange = (e, option) => {
        setOptions({ ...options, [option]: e.target.value });
    };

    const handleIntegerChange = (e) => {
        setIntegerValue(e.target.value);
    };

    const handleSubmit = () => {
        const data = type === 'single_correct' ? {
            question,
            questionType: type,
            options,
            correctOption: options.correctOption
        } : {
            question,
            questionType: type,
            integerValue
        };

        senddata(data);
        sethaveclicked(false)
    };

    return (
        <div>
            <h6>Question</h6>
            <input type='text' placeholder='Enter the question' value={question} onChange={(e) => setQuestion(e.target.value)} /><br />
            <select onChange={handleTypeChange} value={type}>
                <option value={'single_correct'}>Single Correct</option>
                <option value={'integer_type'}>Integer Type</option>
            </select>
            {type === 'single_correct' ? (
                <div>
                    <h4>Option 1</h4>
                    <input type='text' placeholder='Option 1' value={options.option1} onChange={(e) => handleOptionChange(e, 'option1')} />
                    <h4>Option 2</h4>
                    <input type='text' placeholder='Option 2' value={options.option2} onChange={(e) => handleOptionChange(e, 'option2')} />
                    <h4>Option 3</h4>
                    <input type='text' placeholder='Option 3' value={options.option3} onChange={(e) => handleOptionChange(e, 'option3')} />
                    <h4>Correct Option</h4>
                    <input type='text' placeholder='Enter the correct option' value={options.correctOption} onChange={(e) => handleOptionChange(e, 'correctOption')} />
                </div>
            ) : (
                <div>
                    <h4>Correct Input</h4>
                    <input type='number' placeholder='Enter the correct integer' value={integerValue} onChange={handleIntegerChange} />
                </div>
            )}
            <button onClick={handleSubmit} disabled={haveclicked} id='btnclick'>{
                haveclicked ? 'Added to queue' : 'Add question to queue'
            }</button>
        </div>
    );
}

export default Addquiz;