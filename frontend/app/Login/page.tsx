'use client'
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const router = useRouter()
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login/", data);
      const { access, refresh, status , user } = response.data;

      // Set access token and refresh token in local storage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem('status' , status)
      localStorage.setItem('user' , user)

      // Redirect to home page after successful login
      router.push("/");
    } catch (error) {
      console.log("Error in sending request, server issue", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <div className="flex-col justify-center">
        <h3>Login</h3>
        <label>Username</label>
        <input
          placeholder="Enter your username"
          name="username"
          type="text"
          onChange={handleInputChange}
        />
        <label>Password</label>
        <input
          placeholder="Enter your password"
          name="password"
          type="password"
          onChange={handleInputChange}
        />
        <Link href={'/Signup'}>Create account</Link>
        <button onClick={handleLogin}>Login</button>
      </div>
    </main>
  );
};

export default Login;
