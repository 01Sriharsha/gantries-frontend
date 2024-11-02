"use client";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthStore } from "@/state/auth-state";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Notification } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import moment from "moment";
import { cn } from "@/lib/utils";

export default function Notifications() {
  const { isAuthenticated } = useAuthStore((s) => s);

  const { data: notifiactions } = useQuery({
    enabled: isAuthenticated,
    refetchInterval: 10 * 60 * 1000, //refetch after 10min
    queryKey: ["notification"],
    queryFn: async () => {
      const { data } = await axios<Notification[]>({
        method: "get",
        endpoint: `/notification`,
      });

      if (data && data.data) {
        return data.data;
      }

      return [];
    },
  });

  console.log(notifiactions);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="bg-primary rounded-full p-2 text-white">
          <Bell size={"1.1rem"} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        onFocus={() => console.log("blurred")}
        className="max-h-[75vh] overflow-auto p-0 w-full sm:w-96"
      >
        {notifiactions?.map((notification) => (
          <div
          key={notification._id}
            className={cn(
              "w-full p-1 my-0.5 space-y-1 flex items-center gap-2 justify-between",
              !notification.read && "bg-secondary"
            )}
          >
            <Avatar>
              <AvatarImage
                src="/images/nature.jpg"
                alt={notification._id}
                width={40}
                height={40}
                className="object-cover" 
              />
              <AvatarFallback>F</AvatarFallback>
            </Avatar>
            <p>{notification.message}</p>
            <time className="text-xs text-muted-foreground text-center">
              {moment(notification.createdAt).fromNow().substring(0, 6)}
            </time>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
