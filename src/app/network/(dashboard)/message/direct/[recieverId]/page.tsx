"use client";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Info, SendHorizonal } from "lucide-react";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSocket } from "@/providers/socket-provider";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/state/auth-state";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useMessageStote } from "@/state/message-state";

type Message = {
  _id: string;
  recieverId: string;
  senderId: string;
  content: string;
  sentAt: Date;
};

export default function ChatPage({
  params,
}: {
  params: { recieverId: string };
}) {
  const router = useRouter();
  const recieverId = params.recieverId;

  if (!recieverId) router.replace("/network/message");

  const { user } = useAuthStore();

  const { selectedUser } = useMessageStote();

  if (!user) {
    router.replace("/login");
  }
  const { socket, sendMessage } = useSocket();

  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    socket?.emit("getMessages", { senderId: user?._id, recieverId });

    socket?.on("allMessages", (data) => {
      setMessages(data);
    });

    //this is for reciever
    socket?.on("newMessage", (data: Message) => {
      setMessages((prev) =>
        !prev.some((message) => message._id === data._id)
          ? [...prev, data]
          : prev
      );
    });

    //this is for sender
    socket?.on("messageSent", (data: Message) => {
      setMessages((prev) =>
        !prev.some((message) => message._id === data._id)
          ? [...prev, data]
          : prev
      );
    });
  }, [recieverId, socket, user?._id]);

  // Create a ref for the chat container or the last message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to the bottom every time the messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log("messages", messages);

  const onSubmit = (values: { content: string }) => {
    sendMessage({
      senderId: user?._id || "",
      recieverId,
      content: values.content,
    });
    form.reset();
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-[10%] flex items-center gap-2 justify-between w-full border-b border-b-secondary p-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src="/images/nature.jpg"
              alt="1"
              width={80}
              height={80}
              className="object-cover"
            />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <h4 className="text-base font-semibold capitalize">{selectedUser}</h4>
        </div>
        <button>
          <Info size={"1.1rem"} />
        </button>
      </div>
      <div className="h-[80%] p-2 overflow-y-scroll">
        {messages.map((message) => (
          <MessageCard
            key={message._id}
            message={message}
            isSender={message.senderId === user?._id}
          />
        ))}
        {/* This empty div acts as a target for scrollIntoView */}
        <div ref={messagesEndRef} />
      </div>
      <Form {...form}>
        <form
          className="h-[10%] w-full p-2 flex items-center justify-between gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Type here"
                    className="w-full focus-visible:ring-1 focus-visible:ring-primary border border-secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size={"sm"} type="submit">
            <SendHorizonal size="1.1rem" />
          </Button>
        </form>
      </Form>
    </div>
  );
}

function MessageCard({
  isSender = false,
  message,
}: {
  isSender?: boolean;
  message: Message;
}) {
  return (
    <div
      className={cn("w-full flex", isSender ? "justify-end" : "justify-start")}
    >
      <div className="rounded-xl bg-secondary p-2 w-1/2 my-1.5">
        <p className="pt-1 pl-1">{message.content}</p>
        <time className="w-full text-xs text-muted-foreground flex justify-end">
          {moment(message.sentAt).format("h:mm A")}
        </time>
      </div>
    </div>
  );
}
