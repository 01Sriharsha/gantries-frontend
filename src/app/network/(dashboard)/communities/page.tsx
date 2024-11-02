import SuggestedFriends from "@/components/side-section/suggested-friends";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "@/lib/axios";
import { Community } from "@/types";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function CommunitiesPage() {
  const { data } = await axios<Community[]>({
    method: "get",
    endpoint: "/community",
  });
  const communities = data?.data || [];
  return (
    <Card className="border border-secondary rounded-none p-4 m-4">
      <CardTitle className="text-2xl text-primary font-semibold mb-3">
        Explore Communities
      </CardTitle>
      <CardContent className="flex flex-wrap">
        <div className="w-full lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
          {communities.map((community) => (
            <div
              key={community._id}
              className="flex flex-col items-center gap-3 border border-gray-300 p-4 w-3/4"
            >
              <Image
                src={community.picture || "/images/nature.jpg"}
                alt={community.name}
                width={200}
                height={200}
                className="h-28 w-28 rounded-full object-cover border border-secondary"
              />
              <h4 className="text-lg font-semibold text-primary capitalize">
                <Link href={`/network/community/${community.name}`} className="hover:underline">
                  {community.name}
                </Link>
              </h4>
              <p className="flex items-center gap-2 font-medium">
                <User size={"1.1rem"} />
                1.1K
              </p>
              <Button>Follow</Button>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-[30%]">
          <SuggestedFriends />
        </div>
      </CardContent>
    </Card>
  );
}
