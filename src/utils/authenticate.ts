import { cookies } from "next/headers";

export async function isAuthenticated() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("_jwt___");

  const token = cookie?.value;

  if (!token) return false;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/me`,
      {
        method: "GET",
        credentials: "include",
        headers: { Cookie: `${cookie.name}=${cookie.value}` },
        cache: "no-cache",
      }
    );
    const data = await res.json();

    if (data) {
      return true;
    }
  } catch (error: any) {
    console.log("Auth Error:", error);
    return false;
  }

  return false;
}
