"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type SearchProps = {
  className?: string;
};

export default function Search({ className }: SearchProps) {
  return (
    <div className={cn("flex items-center w-[400px]", className)}>
      <SearchIcon size={"1.1rem"} className="translate-x-6" />
      <Input
        type="search"
        placeholder="search"
        className="pl-8 focus-visible:ring-1 focus-visible:ring-primary border border-secondary rounded-full"
      />
    </div>
  );
}
