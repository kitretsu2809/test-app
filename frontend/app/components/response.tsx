import { useState } from "react";
import axios from "axios";
import { quiztakingprops } from "@/types";

const Questions: React.FC<quiztakingprops> = (props) => {
  const token = localStorage.getItem('accessToken');
  const [integerans , setintegerans] = useState(-1)
  const [rtext , setrtext] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false);
let data = {}

if(props.qtype === "integer_type"){
  data = {
    quiz_id: props.quizid,
    question_id: props.questionid,
    user_response: integerans,
    givenint : integerans
  }
}
else{
  data={
    quiz_id: props.quizid,
    question_id: props.questionid,
    user_response : rtext,
    givenint : integerans
  }
}


  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/submit_response/',data,{
        headers:{
          'Authorization' : `${token}`
        }
      })
      setButtonClicked(true)
      console.log(response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error submitting response", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
        {props.qtype === "single_correct" ? (<div>
          <h1>{props.questiontext}</h1>
          <input type="radio" name="option" value={props.option1} onChange={(e) => {setrtext(e.target.value)}} />
          <p>{props.option1}</p>
          <input type="radio" name="option" value={props.option2} onChange={(e) => {setrtext(e.target.value)}} />
          <p>{props.option2}</p>
          <input type="radio" name="option" value={props.option3} onChange={(e) => {setrtext(e.target.value)}} />
          <p>{props.option3}</p>
        </div>) : props.qtype === 'integer_type' ? (<div>
          <h1>{props.questiontext}</h1>
          <input type="number" onChange={(e)=> setintegerans(e.target.value)}/>
        </div>) : (<div>
          <h1>{props.questiontext}</h1>
          <input type="text" onChange={(e)=> setrtext(e.target.value)}/>
        </div>)}
        <button onClick={handleSubmit} disabled={buttonClicked}>Submit</button>
    </div>
  );
};

export default Questions