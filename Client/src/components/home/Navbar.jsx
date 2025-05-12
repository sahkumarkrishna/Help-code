import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const user = false;
  const location = useLocation();  // Get the current route location

  return (
    <div className="bg-[#001F3F] text-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Make the logo a clickable Link that navigates to the home page */}
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold cursor-pointer">
              Bro<span className="text-[#FFD700]">Code</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {/* Hide "Get Started" button on signup page */}
            {location.pathname !== '/signup' && (
              <li>
                <Link to="/signup">
                  <Button
                    variant="outline"
                    className="text-[#001F3F] border-[#FFD700] bg-[#FFD700] hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-200"
                  >
                    Get Started
                  </Button>
                </Link>
              </li>
            )}
            
            {/* Hide "Login" button on login page */}
            {location.pathname !== '/login' && (
              <li>
                <Link to="/login">
                  <Button className="text-[#001F3F] border-white bg-white hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-200">
                    Login
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
