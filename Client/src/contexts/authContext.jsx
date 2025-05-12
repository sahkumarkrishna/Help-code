import { createContext, useContext, useState, useEffect } from "react";
import { Loader2 } from "lucide-react"; // spinner icon

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthState({ isAuthenticated: true, token });
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthState({ isAuthenticated: true, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ isAuthenticated: false, token: null });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#001f3f]">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
      </div>
    );

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
