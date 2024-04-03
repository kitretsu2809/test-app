'use client'
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import "./page.css";
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
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h3 className="text-2xl font-semibold mb-4">Login</h3>
        <label className="block mb-2">Username</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter your username"
          name="username"
          type="text"
        />
        <label className="block mt-4 mb-2">Password</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter your password"
          name="password"
          type="password"
        />
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/Signup" className="text-blue-500 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
