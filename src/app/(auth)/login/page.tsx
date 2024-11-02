import { Metadata } from "next";
import Image from "next/image";
import LoginBG from "@/assets/images/login-bg.png";

import LoginForm from "./login-form";

export const metadata: Metadata = { title: "Login", description: "Login page" };

export default async function LoginPage() {
  return (
    <div className="h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-6">
      <Image
        src={LoginBG}
        alt="register bg"
        width={400}
        height={400}
        className="h-[90vh] mx-auto hidden md:block"
      />
      <div className="p-4 md:p-0 grid place-items-center">
        <LoginForm />
      </div>
    </div>
  );
}
