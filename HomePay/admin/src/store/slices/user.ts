import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Api } from "services/api";
import config from "config";
import jwt from "jwt-decode";
import { AppThunk } from "..";

interface JwtProps {
  exp: number;
  iat: number;
  nameid: string;
  nbf: number;
  [key: string]: any;
}

export interface UserState {
  data: {
    username?: string;
    profilePicture?: string;
    fullName?: string;
    socialName?: string;
    cpf?: string;
    userType?: number;
    email?: string;
    phone?: any;
    gender?: string;
    birthday?: Date;
    address?: any;
    socialMedia?: any[];
    [key: string]: any;
  };
  uniqueName?: string | undefined;
  userId?: string | undefined;
  accessGroup?: string | undefined;
  userType?: string | undefined;
}

export const initialState: UserState = {
  data: {
    profilePicture: config.defaultProfilePicture,
  },
};

const userinfo = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => ({
      data: action.payload.data,
      userId: action.payload.userId,
      accessGroup: action.payload.accessGroup,
      uniqueName: action.payload.uniqueName,
      userType: action.payload.userType,
    }),
    clearUserData: () => initialState, // apenas limpa os dados do usuário settando o estado inicial
  },
});

export const { setUserData, clearUserData } = userinfo.actions;
export default userinfo;

// #region Operações assíncronas
// seguindo a documentação do redux-thunk, cria uma 'action async' que quando for executada e concluida ela dispara um reducer no caso 'setUserData'
export const fetchUserData = (): AppThunk => async (dispatch) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) throw Error("Erro de autenticação");
    const res = await Api.getUserData();
    // salva dados decodificados do token no estado global do app (fica disponivel no redux)
    const decoded: JwtProps = jwt(storedToken);
    dispatch(
      setUserData({
        data: res.data.response,
        userId: decoded.nameid,
        uniqueName: decoded.unique_name,
        userType: decoded.user_type,
        accessGroup: decoded.access_group,
      }),
    );
  } catch (err) {
    toast.error(err);
  }
};
// #endregion
