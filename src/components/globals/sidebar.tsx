"use client";

import { useMemo, useState } from "react";
import { AlignLeft, MessageSquare, Network, Tag, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/state/auth-state";
import { Skeleton } from "@/components/ui/skeleton";
import NavItem from "@/components/globals/nav-item";

type SidebarProps = {
  className?: string;
};

const commonRoutes = [
  {
    label: "Feed",
    href: "/network/feed",
    Icon: AlignLeft,
  },
  {
    label: "Community",
    href: "/network/communities",
    Icon: Users,
  },
  {
    label: "Events",
    href: "/network/event",
    Icon: Tag,
  },
];

const authRoutes = [
  {
    label: "Message",
    href: "/network/message",
    Icon: MessageSquare,
  },
  {
    label: "My Network",
    href: "/network/my-network/friends/requests",
    Icon: Network,
  },
];

export default function Sidebar({ className }: SidebarProps) {
  const { isAuthenticated } = useAuthStore((s) => s);

  const [routes, setRoutes] = useState(commonRoutes);

  useMemo(() => {
    setRoutes(() =>
      isAuthenticated ? [...commonRoutes, ...authRoutes] : commonRoutes
    );
  }, [isAuthenticated]);

  return (
    <aside
      className={cn(
        "sticky top-16 h-[90vh] flex flex-grow flex-col items-start gap-3 border-r border-r-gray-300 p-2 w-full lg:w-[20%]",
        className
      )}
    >
      <div className="flex flex-col gap-2 my-1">
        {routes.map((route) => (
          <NavItem
            key={route.label}
            label={route.label}
            href={route.href}
            Icon={route.Icon}
          />
        ))}
      </div>
      <hr className="border-b border-b-gray-300 w-full" />
    </aside>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="sticky top-16 h-screen flex flex-grow flex-col items-start gap-3 border-r border-r-gray-300 p-2 w-full lg:w-[20%]">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-full">
          <Skeleton className="h-8 my-2 rounded-xl bg-gray-400" />
        </div>
      ))}
      <div className="border-b border-b-gray-300 w-full" />
    </aside>
  );
}
