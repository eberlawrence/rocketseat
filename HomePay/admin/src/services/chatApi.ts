import Axios, { AxiosPromise, AxiosInstance } from "axios";
import config from "config";
import { toast } from "react-toastify";

// Esse é um wrapper do objeto padrão da resposta da api
// para consultar a documentação da api, acesse o swagger da mesma (veja em src/config/index.ts)
export interface Response<T> {
  message?: string;
  statusCode?: number;
  response: T;
}

export interface ChatMessage {
  id: string;
  body: string;
  createdAt: string;
  username: string;
  displayName: string;
  image: string;
  chatId: string;
}

class ChatApiClass {
  private static instance: ChatApiClass;

  public axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({ baseURL: config.chatUrl });
    // Trata o caso genérico de perda de conexão com o servidor (aka usuário sem internet)
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.message === "Network Error") {
          toast.error(`Ops! Verifique sua conexão com a internet!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return Promise.reject(error);
      },
    );
  }

  public static getInstance(): ChatApiClass {
    if (!ChatApiClass.instance) {
      ChatApiClass.instance = new ChatApiClass();
    }
    return ChatApiClass.instance;
  }

  // #region Set/Unset bearer
  public setBearer(token: string) {
    this.axios.defaults.headers.Authorization = `Bearer ${token}`;
  }

  public unsetBearer() {
    this.axios.defaults.headers.Authorization = undefined;
  }
  // #endregion

  // #region Chat Messages
  listOldChatMessages(id: string): AxiosPromise<ChatMessage[]> {
    return this.axios.get(`comments/${id}`);
  }
  // #region

  // #region Classroom Participants
  listClassroomsParticipants(room: string): AxiosPromise<any[]> {
    return this.axios.get(`classrooms/${room}/participants`);
  }
  // #region
}

const ChatApi = ChatApiClass.getInstance();

export { ChatApi };
