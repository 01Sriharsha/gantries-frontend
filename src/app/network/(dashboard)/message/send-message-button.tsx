"use client";

import { Button } from "@/components/ui/button";
import { useSocket } from "@/providers/socket-provider";

export default function SendMessageButton() {
  const { socket, sendMessage } = useSocket();
  return (
    <Button onClick={() => sendMessage({ content: "hello" })}>send</Button>
  );
}
