"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, User } from "lucide-react";
import { useAuthStore } from "@/state/auth-state";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutModal from "@/components/globals/logout-modal";

export default function ProfileActions() {
  const { user } = useAuthStore((state) => state);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className="bg-transparent hover:bg-transparent flex items-center gap-1 border border-transparent hover:border-gray-300 py-2"
        >
          <Image
            src="/images/nature.jpg"
            alt="User Logo"
            width={100}
            height={100}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold hidden md:block">
            {user?.username}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 mt-6 shadow-md border border-gray-300"
        align="end"
      >
        <DropdownMenuGroup className="space-y-1.5">
          <DropdownMenuItem>
            <Link
              href={`/network/user/${user?._id}/profile`}
              className="flex items-center gap-3"
            >
              <User size={"1.1rem"} /> Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="border border-b-gray-200" />

        <DropdownMenuItem asChild>
          <LogoutModal />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
