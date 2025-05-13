import React, { useState, useEffect } from 'react';
import Navbar from "./home/Navbar";
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from "../contexts/authContext"; // ✅ useAuth hook

const Signup = () => {
  const [input, setInput] = useState({
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const { token } = useAuth(); // ✅ get token from auth context

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (token) {
      toast.success("You are already logged in.");
      navigate("/brocode");
    }
  }, [token, navigate]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`,
        input,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
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
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeHandler}
              placeholder="you@example.com"
              required
              className="mt-1"
            />
          </div>

          <div className="mb-4 text-white">
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              value={input.username}
              onChange={changeHandler}
              placeholder="john_doe123"
              required
              className="mt-1"
            />
          </div>

          <div className="mb-6 text-white">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeHandler}
              placeholder="********"
              required
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full my-4 bg-[#FFD700] text-black hover:bg-yellow-400">
            Sign Up
          </Button>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
