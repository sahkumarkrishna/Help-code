import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="bg-[#001F3F] text-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo navigates to /brocode */}
        <div>
          <Link to="/brocode">
            <h1 className="text-2xl font-bold cursor-pointer">
              Bro<span className="text-[#FFD700]">Code</span>
            </h1>
          </Link>
        </div>

        {/* Right-aligned button */}
        <div className="ml-auto">
          {location.pathname === '/settings' ? (
            <Link to="/brocode">
              <Button
                variant="outline"
                className="text-[#001F3F] border-[#FFD700] bg-[#FFD700] hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-200"
              >
                Chat with Bro
              </Button>
            </Link>
          ) : location.pathname == '/brocode' ? (
            <Link to="/settings">
              <Button
                variant="outline"
                className="text-[#001F3F] border-[#FFD700] bg-[#FFD700] hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-200"
              >
                Settings
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
