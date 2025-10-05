import { createContext, useState } from "react";

const AuthContext = createContext();
export default AuthContext;

export function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState();
  const value = {
    isAuth,
    setIsAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}





