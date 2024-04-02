import axios from "axios"; 
import { useEffect, useState } from "react";
import Questions from "./response";
import { useRouter } from "next/navigation";

interface Question {
    id: number;
    question_text: string;
    options: { id: number; option_text: string }[];
    question_type: string;
}

interface Quizid {
    qid: number;
}

const GivenQuuiz: React.FC<Quizid> = (props) => {
    const token = localStorage.getItem('accessToken')
    const router = useRouter()
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleclick = ()=>{
      router.push('/yourquiz')
    }

    useEffect(() => {
        // Ensure quizid is available before making the API request
        if (props.qid) {
            async function getQuestions() {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/quizzes/${props.qid}/questions/`,{
                            headers : {
                                'Authorization' : `${token}`
                            }
                        }
                    );
                    console.log(response.data);
                    setQuestions(response.data);
                } catch (error) {
                    console.log("Error fetching questions", error);
                }
            }
            getQuestions();
        }
    }, [props.qid]);

    return (
        <div>
            {questions.map((question) => (
                <div key={question.id}>
                    {question.question_type === "integer_type" ? (
                        <Questions
                            quizid={props.qid}
                            questionid={question.id}
                            questiontext={question.question_text}
                            qtype={question.question_type}
                        />
                    ) : (
                        <Questions
                            quizid={props.qid}
                            questionid={question.id}
                            questiontext={question.question_text}
                            option1={question.options[0].option_text}
                            option2={question.options[1].option_text}
                            option3={question.options[2].option_text}
                            option1id={question.options[0].id}
                            option2id={question.options[1].id}
                            option3id={question.options[2].id}
                            qtype={question.question_type}
                        />
                    )}
                </div>
            ))}
            <button onClick={handleclick}>Submit Quiz</button>
        </div>
    );
};

export default GivenQuuiz;