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
      router.push('/Login')
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
        <h3 className="text-2xl font-bold mb-4">SignUp</h3>
        <label className="mb-2">Username</label>
        <input
          className="border p-2 rounded"
          placeholder="Create your username"
          name="username"
          type="text"
          onChange={handlechange}
        />
        <label className="mt-4 mb-2">Password</label>
        <input
          className="border p-2 rounded"
          placeholder="Create your password"
          name="password"
          type="password"
          onChange={handlechange}
        />
        <label className="mt-4 mb-2">Email</label>
        <input
          className="border p-2 rounded"
          placeholder="Enter your email"
          name="email"
          type="email"
          onChange={handlechange}
        />
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleclick}
        >
          Create
        </button>
      </div>
    </main>
  );
}

export default Signup