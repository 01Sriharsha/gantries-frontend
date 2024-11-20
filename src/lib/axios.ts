import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "sonner";

export type ResponseBody<T = any> = {
  message?: string;
  data?: T;
};

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
if (!SERVER_URL) {
  console.error("Server URL is not defined in env!!");
  process.exit(0);
}
export const BASE_URL = `${SERVER_URL}/api/`;

export const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export type AxiosOptions = {
  method: "get" | "post" | "put" | "delete";
  endpoint: string;
  body?: any;
  config?: AxiosRequestConfig;
  showErrorToast?: boolean;
};

/**
 * Custom axios instance
 * @param {AxiosOptions} options - axios options
 */
async function axios<T = any>({
  method,
  endpoint,
  body,
  config,
  showErrorToast = false,
}: AxiosOptions) {
  let data: ResponseBody<T> | null = null,
    error = "";
  try {
    const res = await axiosInstance[method]<ResponseBody<T>>(
      endpoint,
      body,
      config
    );
    data = res.data;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      console.log("Axios Error: ", err.response);
      error = err.response?.data.message;
    }
    if (showErrorToast) toast.error(error || "Something went wrong!!");
  }
  return { data, error };
}

export default axios;
