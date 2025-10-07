import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();
export default AuthContext;

export function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState();

  const checkAuth = async () => {
    const token = await SecureStore.getItemAsync("auth_token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    isAuth,
    setIsAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
