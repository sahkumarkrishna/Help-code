import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import Navbar from "./brocode/Navbar";
import Footer from "./home/Footer";
import { useAuth } from "../contexts/authContext";  // Import the useAuth hook

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // New password
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const { logout } = useAuth(); // Use the logout function from context
  const { token } = useAuth();
  const navigate = useNavigate();

const handleModalSubmit = async () => {
  try {
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (currentPassword) updateData.currentPassword = currentPassword;

    // Only send updateData if it's not empty
    if (Object.keys(updateData).length === 0) {
      toast.info("Please provide at least one field to update.");
      return;
    }

    const { data } = await axios.patch(
      `${USER_API_END_POINT}/update`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from context
        },
        withCredentials: true,
      }
    );

    toast.success(data.message);
    setUsername("");
    setEmail("");
    setPassword("");
    setCurrentPassword("");
    setShowModal(false);
  } catch (error) {
    console.error(error); // For debugging
    toast.error(error.response?.data?.message || "Update failed");
  }
};


  const updateHandler = () => {
    if (!username && !email && !password) {
      toast.info("Please enter at least one field to update.");
      return;
    }
    setShowModal(true); // show password confirm modal
  };

  const logoutHandler = async () => {
    try 
    {
      // Call the backend to logout
      const { data } = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      toast.success(data.message);

      // Clear authentication state using context
      logout(); 

      navigate("/"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };


  return (
    <div className="min-h-screen bg-[#001F3F] text-white flex flex-col">
      {/* Add Navbar here */}
      <Navbar />

      <div className="w-full max-w-md bg-[#002b5c] rounded-2xl shadow-lg p-8 mx-auto mt-10 mb-10 flex-grow">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#FFD700]">Settings</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="New Username"
            className="w-full p-3 rounded-lg bg-[#003366] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="New Email"
            className="w-full p-3 rounded-lg bg-[#003366] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded-lg bg-[#003366] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="w-full mt-2 bg-[#FFD700] text-[#001F3F] hover:bg-black hover:text-white transition-all"
            onClick={updateHandler}
          >
            Update Profile
          </Button>

          <Button
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-600 hover:text-white mt-2 transition-all"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Password confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4">Confirm Your Password</h3>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-[#001F3F]"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-[#001F3F] text-white px-4 py-2 rounded-lg"
                onClick={handleModalSubmit}
              >
                Confirm
              </button>
              <button
                className="text-gray-500 hover:underline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Settings;
