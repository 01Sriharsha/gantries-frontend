"use client";

import { useAuthStore } from "@/state/auth-state";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

type MessageData = {
  senderId: string;
  recieverId: string;
  content: string;
}

type SocketContext = {
  socket: Socket | null;
  sendMessage: (messageData: MessageData) => void;
  getMessages: (conversationData: any) => void;
};

const SocketContext = createContext({} as SocketContext);

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const { user } = useAuthStore((s) => s);

  if (!user) {
    router.replace("/login");
  }

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      query: { userId: user?._id }, // Send userId during connection
      // transports: ["websockets"],
    });

    setSocket(newSocket);

    newSocket.on("connection", () => console.log("Connected"));
    newSocket.on("disconnect", () => console.log("Disconnected"));
    newSocket.on("newMessage", (data: any) => console.log(data));
    newSocket.on("error", (data: any) => console.log(data));

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [user?._id]);

  function sendMessage(messageData:MessageData) {
    socket?.emit("sendMessage", messageData);
  }

  function getMessages(conversationData: any) {
    socket?.emit("getMessages", conversationData);
  }

  return (
    <SocketContext.Provider value={{ socket, getMessages, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
}
