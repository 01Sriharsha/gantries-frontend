"use client";

import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { User } from "@/types";
import { useState } from "react";

type ConnectButtonProps = {
  user: User;
};

export default function ConnectButton({ user }: ConnectButtonProps) {
  const [connected, setConnected] = useState(false);
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const { data, error } = await axios({
        method: "post",
        endpoint: "/friendrequest/create",
        body: { receiver: user._id },
        showErrorToast: true,
      });

      if (data) {
        setConnected(true);
      } else if (error) {
        setConnected(false);
      }
    },
  });
  return (
    <Button
      size={"sm"}
      className="rounded-full"
      isLoading={isPending}
      disabled={isPending}
      onClick={() => mutate()}
    >
      {connected ? "Connected" : "Connect"}
    </Button>
  );
}
