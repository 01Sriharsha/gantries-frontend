import { Metadata } from "next";
import { PropsWithChildren } from "react";
import SocketProvider from "@/providers/socket-provider";
import ChatSidebar from "@/components/message/chat-sidebar";
import { APP_TITLE } from "@/utils/constants";
import axios from "@/lib/axios";

export const metadata: Metadata = {
  title: "Messages",
  description: `Messages page of ${APP_TITLE}`,
};

export default async function MessageLayout({ children }: PropsWithChildren) {  
  return (
    <SocketProvider>
      <div className="flex h-[88vh] w-full">
        <ChatSidebar />
        <div className="w-[70%]">{children}</div>
      </div>
    </SocketProvider>
  );
}
