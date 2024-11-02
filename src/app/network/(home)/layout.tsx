import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen bg-image md:bg-none">
      <nav className="max-w-screen-xl mx-auto fixed inset-0 w-full bg-white h-full max-h-[10vh] z-50 flex justify-start items-center gap-6">
        <Link href="/">
          <h1 className={cn("text-3xl font-bold px-4 text-primary")}>
            Gantries
          </h1>
        </Link>
        <Link href="/network/feed" className="hover:text-primary hover:underline">
          Feed
        </Link>
      </nav>
      <main className="max-w-screen-xl mx-auto pt-[10vh]">{children}</main>
    </div>
  );
}
