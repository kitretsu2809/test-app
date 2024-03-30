'use client'
import axios from "axios"; 
import { useEffect, useState } from "react";
import Questions from "./response";

interface quizid {
    qid : number
}

const GivenQuuiz: React.FC<quizid>=(props) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Ensure quizid is available before making the API request
    if (props.qid) {
      async function getQuestions() {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/quizzes/${props.qid}/questions/`
          );
          console.log(response.data);
          setQuestions(response.data);
        } catch (error) {
          console.log("Error fetching questions", error);
        }
      }
      getQuestions();
    }
  },[]);

  return (
    <div>
        {
            questions.map((e)=>{
                return (<div key={e.id}>
                    <Questions quizid={props.qid} questionid={e.id} questiontext={e.question_text} option1={e.options[0].option_text} option2={e.options[1].option_text} option3={e.options[2].option_text} option1id={e.options[0].id} option2id={e.options[1].id} option3id={e.options[2].id}></Questions>
                </div>)
            })
        }
    </div>

  );
};

export default GivenQuuiz;