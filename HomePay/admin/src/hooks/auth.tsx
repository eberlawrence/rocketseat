import React, { createContext, useCallback, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Api } from "services/api";
import jwt from "jwt-decode";
import { fetchUserData } from "store/slices/user";

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthState {
  token: string;
}

interface JwtProps {
  exp: number;
  iat: number;
  nameid: string;
  nbf: number;
  [key: string]: any;
}

interface IAuthContext {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  data: AuthState;
  signed: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const [signed, setSigned] = useState<boolean>(false);

  const isValidJWT = useCallback((token: string) => {
    const decoded: JwtProps = jwt(token);
    const currentTime = new Date().getTime() / 1000;
    if (currentTime < decoded.exp) {
      Api.setBearer(token);
      return true;
    }
    return false;
  }, []);

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("token");
    if (token && isValidJWT(token)) {
      setSigned(true);
      dispatch(fetchUserData());
      return { token };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ username, password }) => {
      try {
        const res = await Api.login({ username, password });
        const { token } = res.data.response as any;
        localStorage.setItem("token", token);
        setSigned(true);
        Api.setBearer(token);
        dispatch(fetchUserData());
        setData({ token });
      } catch (error) {
        throw error.response;
      }
    },
    [dispatch],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    setData({} as AuthState);
  }, []);

  return <AuthContext.Provider value={{ signIn, signOut, data, signed }}>{children}</AuthContext.Provider>;
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
