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
    <div className="bg-gray-100 p-4">
  {props.qtype === "single_correct" ? (
    <div>
      <h1 className="text-xl font-semibold">{props.questiontext}</h1>
      <input
        type="radio"
        name="option"
        value={props.option1}
        onChange={(e) => setrtext(e.target.value)}
        className="mr-2"
      />
      <p className="mb-2">{props.option1}</p>
      <input
        type="radio"
        name="option"
        value={props.option2}
        onChange={(e) => setrtext(e.target.value)}
        className="mr-2"
      />
      <p className="mb-2">{props.option2}</p>
      <input
        type="radio"
        name="option"
        value={props.option3}
        onChange={(e) => setrtext(e.target.value)}
        className="mr-2"
      />
      <p className="mb-2">{props.option3}</p>
    </div>
  ) : (
    <div>
      <h1 className="text-xl font-semibold">{props.questiontext}</h1>
      <input
        type="number"
        onChange={(e) => setintegerans(e.target.value)}
        className="w-16 mt-2"
      />
    </div>
  )}
  <button
    onClick={handleSubmit}
    disabled={buttonClicked}
    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
  >
    Submit
  </button>
</div>

  );
};

export default Questions