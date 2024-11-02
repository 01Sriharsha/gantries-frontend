import { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { SidebarSkeleton } from "@/components/globals/sidebar";
import { NavbarSkeleton } from "@/components/globals/navbar";

const Navbar = dynamic(() => import("@/components/globals/navbar"), {
  ssr: false,
  loading: () => <NavbarSkeleton />,
});
const Sidebar = dynamic(() => import("@/components/globals/sidebar"), {
  ssr: false,
  loading: () => <SidebarSkeleton />,
});

export default async function NetworkDashboardLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-screen-2xl mx-auto flex h-full">
        <Sidebar className="hidden md:block md:max-w-[30%] lg:max-w-[20%] w-full" />
        <div className="md:max-w-[70%] lg:max-w-[80%] w-full">{children}</div>
      </main>
    </div>
  );
}
