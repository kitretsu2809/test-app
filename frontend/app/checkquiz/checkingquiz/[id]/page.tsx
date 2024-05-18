'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Checkquiz from '@/app/components/checkquiz';

interface Response {
    question: string;
    responses: { username: string, response: string }[];
    questionid: number;
}

const Checking = ({ params }: { params: { id: string } }) => {
    const quizid = parseInt(params.id);
    const token = localStorage.getItem('accessToken');
    const [response, setResponse] = useState<Response[]>([]);
    const [index, setIndex] = useState(0);

    const fetch = async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/checkquiz/${quizid}/`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setResponse(result.data.paragraph_responses);
        } catch (error) {
            console.log('Error in fetching data', error);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % response.length);
    };

    const handlePrevious = () => {
        setIndex((prevIndex) => (prevIndex - 1 + response.length) % response.length);
    };

    if (response.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = response[index];

    return (
        <div>
            <h4>Question: {currentQuestion.question}</h4>
            {currentQuestion.responses.map((resp, i) => (
                <Checkquiz
                    key={resp.response}
                    username={resp.username}
                    response={resp.response}
                    questionid={currentQuestion.questionid}
                />
            ))}
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Checking;