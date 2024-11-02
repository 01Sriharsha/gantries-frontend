import { Metadata } from "next";
import Image from "next/image";
import RegisterBG from "@/assets/images/register-bg.png";

import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Registration page",
};

export default async function RegsiterPage() {
  return (
    <div className="h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-6">
      <Image
        src={RegisterBG}
        alt="register bg"
        width={400}
        height={400}
        className="h-[90vh] mx-auto hidden md:block"
      />
      <div className="h-[90vh] p-4 md:p-0 grid place-items-center overflow-auto">
        <RegisterForm />
      </div>
    </div>
  );
}
