"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useAuthStore } from "@/state/auth-state";
import CreateConversation from "./create-conversation";
import moment from "moment";
import { useMessageStote } from "@/state/message-state";


type Conversation = {
  participants: {
    _id: string;
    username: string;
    email: string;
  }[];
  lastMessage: string;
  lastMessageTime: Date;
};

export default function ChatSidebar() {
  const { isAuthenticated } = useAuthStore((s) => s);

  const { data: conversations } = useQuery({
    enabled: isAuthenticated,
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data } = await axios<Conversation[]>({
        method: "get",
        endpoint: "/conversation",
      });

      return data?.data || [];
    },
  });

  console.log("conversations", conversations);

  return (
    <div className="h-full w-[30%] py-4 px-2 border-r border-r-secondary space-y-2">
      {/* Search */}
      <div className="relative flex items-center w-full gap-3">
        <SearchIcon size={"1.1rem"} className="absolute left-2" />
        <Input
          type="search"
          placeholder="search"
          className="pl-8 focus-visible:ring-1 focus-visible:ring-primary border border-secondary rounded-full"
        />
        <CreateConversation />
      </div>

      {conversations?.map((conversation, i) => (
        <ConversationCard key={i} conversation={conversation} />
      ))}
    </div>
  );
}

function ConversationCard({ conversation }: { conversation: Conversation }) {
  const router = useRouter();
  const { user } = useAuthStore((s) => s);
  const { updateSelectedUser } = useMessageStote((s) => s);
  const reciever = conversation.participants.find((p) => p._id !== user?._id);
  return (
    <button
      className="flex items-center gap-3"
      onClick={() => {
        updateSelectedUser(reciever?.username || "");
        router.push(`/network/message/direct/${reciever?._id}`);
      }}
    >
      <Avatar>
        <AvatarImage
          src="/images/nature.jpg"
          alt={reciever?.username}
          width={80}
          height={80}
          className="object-cover"
        />
        <AvatarFallback>
          {reciever?.username?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="w-full flex flex-col items-start">
        <div className="w-full flex items-center justify-between gap-2">
          <h4 className="text-base font-semibold capitalize">
            {reciever?.username}
          </h4>
          <time className="text-xs text-muted-foreground">
            {moment(conversation.lastMessageTime).format("h:mm A")}
          </time>
        </div>
        <p className="text-sm text-muted-foreground">
          {conversation.lastMessage}
        </p>
      </div>
    </button>
  );
}
