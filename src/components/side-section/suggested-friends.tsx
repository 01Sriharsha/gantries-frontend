import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import axios from "@/lib/axios";
import { User } from "@/types";
import Link from "next/link";
import ConnectButton from "./connect-button";

export default async function SuggestedFriends() {
  const { data } = await axios<User[]>({
    method: "get",
    endpoint: "/user",
  });

  const users = data?.data || [];
  return (
    <Card className="flex flex-col gap-4 border border-secondary p-2.5 rounded-none">
      <CardTitle className="text-xl text-primary font-semibold">
        Suggested Friends
      </CardTitle>
      <CardContent className="flex flex-col items-center gap-4 justify-center p-0">
        {users.map((user, i) => (
          <div
            key={i}
            className="flex items-center gap-3 justify-between w-full"
          >
            <Image
              src={"/images/nature.jpg"}
              alt={user.username}
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
