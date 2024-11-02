import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen bg-image md:bg-none">
      <nav className="max-w-screen-lg mx-auto fixed inset-0 w-full bg-white h-full max-h-[10vh] z-50 flex justify-start items-center">
        <Link href="/">
          <h1 className={cn("text-3xl font-bold px-4 md:pl-16 text-primary")}>
            Gantries
          </h1>
        </Link>
      </nav>
      <main className="max-w-screen-lg mx-auto pt-[10vh]">{children}</main>
    </div>
  );
}
