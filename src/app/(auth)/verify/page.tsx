import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import RegisterBG from "@/assets/images/register-bg.png";

import VerifyForm from "./verify-form";

export const metadata: Metadata = {
  title: "Verify Account",
  description: "Account verification page",
};

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { phone: string };
}) {
  const phone = searchParams?.phone;

  if (!phone) {
    return redirect("/login");
  }
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
        <VerifyForm phone={phone} />
      </div>
    </div>
  );
}
