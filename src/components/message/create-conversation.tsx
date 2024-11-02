"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "@/lib/axios";
import { useAuthStore } from "@/state/auth-state";
import { useQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useMessageStote } from "@/state/message-state";

type Friend = {
  friendId: Partial<User>;
  _id: string;
};

export default function CreateConversation() {
  const router = useRouter();
  const { user } = useAuthStore((s) => s);
  const { updateSelectedUser } = useMessageStote();
  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const { data } = await axios<Friend[]>({
        method: "get",
        endpoint: `/friendrequest/${user?._id}/friends`,
      });
      return data?.data || [];
    },
  });

  console.log("friends", friends);

  return (
    <Dialog>
      <DialogTrigger>
        <Edit size={"1.1rem"} />
      </DialogTrigger>
      <DialogContent aria-describedby="create conversation">
        <DialogHeader>
          <DialogTitle className="text-center text-primary text-lg">
            Create a conversation
          </DialogTitle>
        </DialogHeader>
        {friends?.map((friend) => (
          <div
            key={friend._id}
            className="w-full bg-secondary p-2 flex items-center justify-between gap-3"
          >
            <Avatar>
              <AvatarImage
                src="/images/nature.jpg"
                alt={friend.friendId.username}
                width={60}
                height={60}
                className="object-cover"
              />
              <AvatarFallback>
                {friend?.friendId.username?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h4 className="w-full text-start text-xl font-semibold capitalize text-primary">
              {friend.friendId.username}
            </h4>
            <DialogClose asChild>
              <Button
                size={"sm"}
                className="rounded-full px-6"
                onClick={() => {
                  updateSelectedUser(friend.friendId.username || "");
                  router.push(`/network/message/direct/${friend.friendId._id}`);
                }}
              >
                Chat
              </Button>
            </DialogClose>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
