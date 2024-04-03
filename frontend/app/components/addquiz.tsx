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
        <div className="bg-gray-100 p-4">
  <h6 className="text-lg font-semibold">Question</h6>
  <input
    type="text"
    placeholder="Enter the question"
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    className="w-full p-2 mt-2 border rounded-md"
  />
  <select
    onChange={handleTypeChange}
    value={type}
    className="w-full p-2 mt-2 border rounded-md"
  >
    <option value="single_correct">Single Correct</option>
    <option value="integer_type">Integer Type</option>
  </select>
  {type === "single_correct" ? (
    <div>
      <h4 className="mt-4">Options</h4>
      <input
        type="text"
        placeholder="Option 1"
        value={options.option1}
        onChange={(e) => handleOptionChange(e, "option1")}
        className="w-full p-2 mt-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Option 2"
        value={options.option2}
        onChange={(e) => handleOptionChange(e, "option2")}
        className="w-full p-2 mt-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Option 3"
        value={options.option3}
        onChange={(e) => handleOptionChange(e, "option3")}
        className="w-full p-2 mt-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Correct Option"
        value={options.correctOption}
        onChange={(e) => handleOptionChange(e, "correctOption")}
        className="w-full p-2 mt-2 border rounded-md"
      />
    </div>
  ) : (
    <div>
      <h4 className="mt-4">Correct Input</h4>
      <input
        type="number"
        placeholder="Enter the correct integer"
        value={integerValue}
        onChange={handleIntegerChange}
        className="w-full p-2 mt-2 border rounded-md"
      />
    </div>
  )}
  <button
    onClick={handleSubmit}
    disabled={haveclicked}
    id="btnclick"
    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
  >
    {haveclicked ? "Added to queue" : "Add question to queue"}
  </button>
</div>

    );
}

export default Addquiz;