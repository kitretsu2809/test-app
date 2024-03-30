import { useState } from "react";
import axios from "axios";
import { quiztakingprops } from "@/types";

const Questions: React.FC<quiztakingprops> = (props) => {
  const token = localStorage.getItem('accessToken');
  const [selectedOption, setSelectedOption] = useState('');

  const data = {
        token: token,
        quiz_id: props.quizid,
        question_id: props.questionid,
        selected_option_id: selectedOption,
  }


  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/submit_response/',data)
      console.log(response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error submitting response", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h1>{props.questiontext}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="option1">{props.option1}</label>
        <input type="radio" name="option" value='1' onChange={(e) => setSelectedOption(e.target.value)} />
        <label htmlFor="option2">{props.option2}</label>
        <input type="radio" name="option" value='2' onChange={(e) => setSelectedOption(e.target.value)} />
        <label htmlFor="option3">{props.option3}</label>
        <input type="radio" name="option" value='3' onChange={(e) => setSelectedOption(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Questions