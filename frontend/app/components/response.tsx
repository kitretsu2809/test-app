import { useState } from "react";
import axios from "axios";
import { quiztakingprops } from "@/types";

const Questions: React.FC<quiztakingprops> = (props) => {
  const token = localStorage.getItem('accessToken');
  const [selectedOption, setSelectedOption] = useState(0);
  const [integerans , setintegerans] = useState(-1)
let data = {}

if(props.qtype === "integer_type"){
  data = {
    quiz_id: props.quizid,
    question_id: props.questionid,
    givenint : integerans
  }
}
else{
  data={
    quiz_id: props.quizid,
    question_id: props.questionid,
    selected_option_id: selectedOption,
  }
}


  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/submit_response/',data,{
        headers:{
          'Authorization' : `${token}`
        }
      })
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
          <input type="radio" name="option" value="1" onChange={(e) => setSelectedOption(e.target.value)} />
          <p>{props.option1}</p>
          <input type="radio" name="option" value="2" onChange={(e) => setSelectedOption(e.target.value)} />
          <p>{props.option2}</p>
          <input type="radio" name="option" value="3" onChange={(e) => setSelectedOption(e.target.value)} />
          <p>{props.option3}</p>
        </div>) : (<div>
          <h1>{props.questiontext}</h1>
          <input type="number" onChange={(e)=> setintegerans(e.target.value)}/>
        </div>)}
        <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Questions