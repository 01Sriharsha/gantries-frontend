"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItemProps = {
  className?: string;
  label: string;
  href: string;
  Icon: LucideIcon;
};

export default function NavItem({
  className,
  Icon,
  href,
  label,
}: NavItemProps) {
  const pathname = usePathname();
  return (
    <Link key={label} href={href} className="w-full">
      <nav
        className={cn(
          "w-full flex items-center justify-start gap-3 p-2 text-sm hover:bg-secondary hover:rounded-xl",
          pathname === href &&
            "text-primary font-semibold bg-primary text-white rounded-xl hover:bg-primary transition-all duration-200 ease-linear",
          className
        )}
      >
        <span>
          <Icon className="w-4 h-4" />
        </span>
        <p>{label}</p>
      </nav>
    </Link>
  );
}
