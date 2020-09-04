import Axios, { AxiosPromise, AxiosInstance } from "axios";
import { toast } from "react-toastify";

export interface Response<T> {
  message?: string;
  statusCode?: number;
  response: T;
}

class ApiClass {
  private static instance: ApiClass;

  public axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({ baseURL: "http://datahome-srv.noip.me/aule-api/v0" });

    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.message === "Network Error") {
          toast.error(`Ops! Verifique sua conexão com a internet!`, {
            position: "top-right",
            autoClose: 30000,
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

  public static getInstance(): ApiClass {
    if (!ApiClass.instance) {
      ApiClass.instance = new ApiClass();
    }
    return ApiClass.instance;
  }

  public setBearer(token: string) {
    this.axios.defaults.headers.Authorization = `Bearer ${token}`;
  }

  public unsetBearer() {
    this.axios.defaults.headers.Authorization = undefined;
  }

  /* Auth */
  login(body: any): AxiosPromise<Response<any>> {
    return this.axios.post(`Auth/login`, body);
  }

  /* Me */
  getUserData(): AxiosPromise<
    Response<{
      username: string;
      profilePicture: string;
      fullName: string;
      socialName: string;
      cpf: string;
      userType: number;
      email: string;
      phone?: any;
      gender: string;
      birthday: Date;
      address: any;
      socialMedia: any[];
      [key: string]: any;
    }>
  > {
    return this.axios.get(`me/data`);
  }

  /* Lessons */
  listLessons(pagination?: any): AxiosPromise<any> {
    let params = "?";
    if (pagination !== undefined) {
      if (pagination.page) params += `PageNumber=${pagination.page}&`;
      if (pagination.size) params += `PageSize=${pagination.size}&`;
    }
    return this.axios.get(`lesson${params}`);
  }

  /* Courses */
  listCourses(pagination?: any, searchParams?: any): AxiosPromise<Response<any[]>> {
    let params = "?";
    if (pagination !== undefined) {
      if (pagination.page) params += `PageNumber=${pagination.page}&`;
      if (pagination.size) params += `PageSize=${pagination.size}&`;
    }
    if (searchParams !== undefined) {
      if (searchParams.author) params += `SearchByAuthor=${searchParams.author}&`;
    }
    return this.axios.get(`course${params}`);
  }

  /* Lives */
  createLiveEvent(body: any): AxiosPromise<Response<any>> {
    return this.axios.post(`lives/event`, body);
  }

  getLiveEvent(id: string): AxiosPromise<Response<any>> {
    return this.axios.get(`lives/${id}`);
  }

  listLiveEvent(): AxiosPromise<Response<any[]>> {
    return this.axios.get(`lives`);
  }

  beginEvent(id: string): AxiosPromise<Response<any>> {
    return this.axios.patch(`lives/${id}/begin-event`);
  }

  endEvent(id: string): AxiosPromise<Response<any>> {
    return this.axios.patch(`lives/${id}/end-event`);
  }

  updateEvent(id: string, body: any): AxiosPromise<Response<any>> {
    return this.axios.put(`lives/${id}`, body);
  }
}

const Api = ApiClass.getInstance();

export { Api };
