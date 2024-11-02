import { Metadata } from "next";
import Image from "next/image";
import RegisterBG from "@/assets/images/register-bg.png";
import BasicInfoForm from "./info-form";
import TestForm from "./form";

export const metadata: Metadata = {
  title: "Basic Info",
  description: "Basic Information page",
};

export default async function BasicInfoPage() {
  return (
    <div className="w-full h-[90vh] md:pl-16 grid place-items-center">
        <TestForm />
    </div>
  );
}
