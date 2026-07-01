import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    loading: boolean;
    isAuthenticated: boolean;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  interface Props {
    children: React.ReactNode;
  }
  
  export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
  
    const [token, setToken] = useState<string | null>(
      localStorage.getItem("token")
    );
  
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const savedUser = localStorage.getItem("user");
  
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
  
      setLoading(false);
    }, []);
  
    const login = (jwt: string, userData: User) => {
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(userData));
  
      setToken(jwt);
      setUser(userData);
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
  
      setToken(null);
      setUser(null);
    };
  
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
          login,
          logout,
          loading,
          isAuthenticated: !!token,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuthContext = () => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error("useAuthContext must be used inside AuthProvider");
    }
  
    return context;
  };