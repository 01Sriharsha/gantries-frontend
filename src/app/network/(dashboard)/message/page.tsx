import { MessageSquare } from "lucide-react";
import React from "react";

export default function MessagePage() {
  return (
    <div className="h-full grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <MessageSquare size={"4rem"} />
        <p>Send a message to start a chat</p>
      </div>
    </div>
  );
}
