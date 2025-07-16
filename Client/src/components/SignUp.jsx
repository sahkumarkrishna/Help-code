import React, { useState, useEffect } from 'react';
import Navbar from "./home/Navbar";
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from "../contexts/authContext";

// Load API base URL from environment
const USER_API = import.meta.env.VITE_USER_API;

const Signup = () => {
  const [input, setInput] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const { token } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      toast.success("You are already logged in.");
      navigate("/helpcode");
    }
  }, [token, navigate]);

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { email, username, password, confirmPassword } = input;

    if (!email || !username || !password || !confirmPassword) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${USER_API}/register`, { email, username, password, confirmPassword }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login"); // ✅ Redirect to login after registration
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#003153] text-[#FFD700]">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 bg-[#002244] border border-[#FFD700] rounded-md p-6 my-10 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

          <div className="mb-4 text-white">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeHandler}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4 text-white">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              value={input.username}
              onChange={changeHandler}
              placeholder="john_doe123"
              required
            />
          </div>

          <div className="mb-4 text-white">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={changeHandler}
              placeholder="********"
              required
            />
          </div>

          <div className="mb-6 text-white">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={changeHandler}
              placeholder="********"
              required
            />
          </div>

          <Button type="submit" className="w-full my-4 bg-[#FFD700] text-black hover:bg-yellow-400">
            Sign Up
          </Button>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-white underline hover:text-yellow-300">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
