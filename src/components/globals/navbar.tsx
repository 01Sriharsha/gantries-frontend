"use client";

import { useAuthStore } from "@/state/auth-state";
import { APP_TITLE } from "@/utils/constants";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItem from "./nav-item";
import { LogIn } from "lucide-react";
import SidebarMobile from "./sidebar-mobile";
import Search from "./search";
import ProfileActions from "./profile-actions";
import { Skeleton } from "../ui/skeleton";
import Notifications from "./notifications";

export default function Navbar() {
  const { user } = useAuthStore((state) => state);
  return (
    <nav className="sticky top-0 z-[50] bg-white w-full p-4 shadow-sm h-16 border-b border-b-secondary">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <SidebarMobile />
          <Link href="/network">
            {/* <Logo className="transform -translate-y-1.5" /> */}
            <h1 className="text-3xl text-primary font-bold">{APP_TITLE}</h1>
          </Link>
        </div>
        {/* <Search /> */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-2">
              <Notifications />
              <ProfileActions />
            </div>
          ) : (
            <>
              <Button className="px-4 rounded-full">
                <NavItem
                  Icon={LogIn}
                  href="/login"
                  label="Sign In"
                  className="hover:bg-transparent"
                />
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export function NavbarSkeleton() {
  return (
    <nav className="sticky top-0 z-[50] bg-white w-full p-4 shadow-sm h-16 border-b border-b-secondary">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Sidebar Mobile Icon */}
          <Skeleton className="md:hidden h-8 w-8 rounded-full bg-gray-400" />

          {/* Title / Logo */}
          <Skeleton className="h-8 w-36 bg-gray-400" />
        </div>

        {/* Search Bar */}
        <Skeleton className="h-10 w-[400px] bg-gray-400" />

        {/* Profile Actions or Sign In Button */}
        <Skeleton className="h-10 w-28 rounded-full bg-gray-400" />
      </div>
    </nav>
  );
}
