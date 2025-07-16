import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {
  const location = useLocation();

  return (
    <div className="bg-[#001F3F] text-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo navigates to /codebro */}
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold cursor-pointer">
              Help<span className="text-purple-600">Code</span>
            </h1>
          </Link>
        </div>

        {/* Right-aligned button */}
        <div className="ml-auto">
          {location.pathname === '/settings' ? (
            <Link to="/helpcode">
              <Button
                variant="outline"
                className="text-[#001F3F] border-[#FFD700] bg-[#FFD700] hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-200"
              >
                Chat with HelpCode
              </Button>
            </Link>
          ) : location.pathname == '/helpcode' ? (
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
