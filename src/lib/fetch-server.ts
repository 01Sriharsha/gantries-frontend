import { cookies } from "next/headers";
import { BASE_URL } from "./axios";

const getCookie = () => {
  const COOKIE_NAME = "_jwt___";
  const cookieStore = cookies();

  const cookie = cookieStore.get(COOKIE_NAME);

  return `${cookie?.name}=${cookie?.value}`;
};

interface FetchOptions {
  method: "get" | "post" | "put" | "delete";
  endpoint: string;
  body?: any;
  config?: RequestInit;
}

interface ResponseBody<T = any> {
  data?: T;
  message?: string;
}

/**
 * Custom fetch function for server-side fetching
 * @param {FetchOptions} options - fetch options
 */
async function fetchServer<T = any>({
  method,
  endpoint,
  body,
  config,
}: FetchOptions): Promise<{ data: ResponseBody<T> | null; error: string }> {
  let data: ResponseBody<T> | null = null,
    error = "";

  try {
    const res = await fetch(BASE_URL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: getCookie(),
        ...(config?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.message || "Something went wrong!");
    }

    data = (await res.json()) as ResponseBody<T>;
  } catch (err: any) {
    console.error("Fetch Error: ", err);
    error = err.message || "Something went wrong!!";
  }

  return { data, error };
}

export default fetchServer;
