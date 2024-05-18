'use client'
import axios from "axios";
import React, { useState } from "react";

interface ParagraphResponse {
    response: string;
    username: string;
    questionid: number;
}

const Checkquiz: React.FC<ParagraphResponse> = (props) => {
    const [marks, setMarks] = useState<number>(0);
    const [clicked  ,setclicked] = useState(false)

    async function handleClick() {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/getcheck/${props.username}/${props.questionid}/`,
                { marks }
            );
            setclicked(true)
        } catch (error) {
            console.log('error from server', error);
        }
    }

    return (
        <div style={{ backgroundColor: 'pink', marginBottom: '10px', padding: '10px' }}>
            <h6>{props.username}</h6>
            <p>{props.response}</p>
            <input id="hehe"
                placeholder="Enter the marks you want to give"
                type="number"
                value={marks}
                onChange={(e) => setMarks(parseInt(e.target.value))}
            />
            <button onClick={handleClick} disabled={clicked}>Submit</button>
        </div>
    );
};

export default Checkquiz;