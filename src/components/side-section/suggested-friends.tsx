"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ConnectButton from "./connect-button";
import { useAuthStore } from "@/state/auth-state";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { User } from "@/types";

export default function SuggestedFriends() {
  const { user } = useAuthStore();

  const { data: users, isFetching } = useQuery({
    staleTime : 3 * 60 * 1000, //3 minutes
    queryKey: ["suggested users"],
    queryFn: async () => {
      const { data } = await axios<Partial<User>[]>({
        method: "get",
        endpoint: user ? `/friendRequest/${user?._id}/suggest` : "/user",
      });
      if (data) {
        return data.data || [];
      }

      return [];
    },
  });

  if (isFetching) {
    return (
      <div className="grid place-items-center h-full">
        <Loader2 size={"4rem"} className="animate-spin text-primary" />
      </div>
    );
  }
  return (
    <Card className="flex flex-col gap-4 border border-secondary p-2.5 rounded-none">
      <CardTitle className="text-xl text-primary font-semibold">
        Suggested Friends
      </CardTitle>
      <CardContent className="flex flex-col items-center gap-4 justify-center p-0">
        {users?.slice(0,10)?.map((user, i) => (
          <div
            key={i}
            className="flex items-center gap-3 justify-between w-full"
          >
            <Image
              src={"/images/nature.jpg"}
              alt={user?.username || "user"}
              width={60}
              height={60}
              className="w-8 h-8 object-cover rounded-full"
            />
            <Link
              href={`/network/user/${user._id}/profile`}
              className="w-full hover:text-primary hover:underline"
            >
              <h4 className="text-base font-semibold capitalize text-start">
                {user.username}
              </h4>
            </Link>
            <ConnectButton user={user} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
