import React, { useState } from "react";
import Navbar from "./home/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "../contexts/authContext"; // <-- Import useAuth to get login function

const Login = () => {
  const [input, setInput] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- Use login function from context

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${input.token}`,  // Add Authorization header if needed
          },
        }
      );

      if (res.data.success && res.data.token) {
        console.log(res.data.token);
        login(res.data.token); // This sets auth in context and persists it in localStorage
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/brocode");
        }, 100);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="min-h-screen bg-[#003153] text-white">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 bg-[#002244] border border-[#FFD700] rounded-md p-6 my-10 shadow-md"
        >
          <h1 className="font-bold text-2xl mb-6 text-[#FFD700]">Log In</h1>

          <div className="my-4">
            <Label className="text-gray-300">Email or Username</Label>
            <Input
              className="mt-1 bg-[#001f3f] text-white border border-gray-500 placeholder-gray-400"
              type="text"
              value={input.identifier}
              name="identifier"
              onChange={changeEventHandler}
              placeholder="Enter your email or username"
            />
          </div>

          <div className="my-4">
            <Label className="text-gray-300">Password</Label>
            <Input
              className="mt-1 bg-[#001f3f] text-white border border-gray-500 placeholder-gray-400"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
            />
          </div>

          <Button
            type="submit"
            className="w-full my-4 bg-[#FFD700] text-black hover:bg-yellow-400 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </Button>

          <span className="text-sm text-gray-300">
            or Create a new account{" "}
            <Link to="/signup" className="text-[#FFD700] hover:underline">
              here
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
