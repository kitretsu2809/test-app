'use client'
import React , {useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
  const router = useRouter()
  const [data, setData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleclick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signup/', data);
      console.log(response.data);
      router.push('/Signup')
    } catch (error) {
      console.log('error in sending request , server issue', error);
    }
  }

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <div className="flex-col justify-center">
        <h3>SignUp</h3>
        <label>username</label>
        <input placeholder="create your username" name="username" type="text" onChange={handlechange}></input>
        <label>password</label>
        <input placeholder="create your password" name="password" type="password" onChange={handlechange}></input>
        <label>email</label>
        <input placeholder="enter your email" name="email" type="email" onChange={handlechange}></input>
        <button onClick={handleclick}>create</button>
      </div>
    </main>
  );
}

export default Signup