import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authToken on initial load and when pathname changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token); // true if token exists
    };

    checkAuth();

    // Listen for token changes from other tabs or components
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="bg-[#001F3F] text-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold cursor-pointer">
              Help<span className="text-purple-600">Code</span>
            </h1>
          </Link>
        </div>

        {/* Right-side buttons */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {/* Show Login if not logged in and not already on login page */}
            {!isLoggedIn && location.pathname !== "/login" && (
              <li>
                <Link to="/login">
                  <Button className="text-[#001F3F] border-white bg-white hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-200">
                    Login
                  </Button>
                </Link>
              </li>
            )}

            {/* Show Logout if logged in */}
            {isLoggedIn && (
              <li>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
                >
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
