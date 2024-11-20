"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Bell, BellOff } from "lucide-react";
import { Community } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/state/auth-state";

type CommunitySubscribeButtonProps = {
  community: Community;
  className?: string;
  showText?: boolean;
};

/** A Client component which can interact with server */
const CommunitySubscribeButton = ({
  className,
  community,
  showText = true,
}: CommunitySubscribeButtonProps) => {
  const { isAuthenticated } = useAuthStore();
  const [isSubscribed, setIsSubscribed] = useState(community.isSubscribed);

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const { data, error } = await axios({
        method: "post",
        endpoint: `/community/${community._id}/subscribe`,
      });
      if (error) {
        toast.error(error);
        return;
      } else if (data) {
        toast.info(data.message);
        setIsSubscribed(!isSubscribed);
      }
    },
  });
  return (
    <Button
      isLoading={isPending}
      disabled={isPending}
      size={"sm"}
      className={cn(
        "flex justify-center items-center gap-2 rounded-full text-sm",
        className
      )}
      onClick={() =>
        isAuthenticated ? mutate() : toast.info("Login to subscribe")
      }
    >
      {showText && <span>{isSubscribed ? "Unsubscribe" : "Subscribe"}</span>}
      {isSubscribed ? <BellOff size={"1rem"} /> : <Bell size={"1rem"} />}
    </Button>
  );
};

export default CommunitySubscribeButton;
