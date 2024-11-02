"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "@/lib/axios";
import { useAuthStore } from "@/state/auth-state";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, Loader, Trash } from "lucide-react";
import { toast } from "sonner";

type FriendRequest = {
  _id: string;
  createdAt: string; // You can also use Date if you prefer parsing it to a Date object
  updatedAt: string;
  receiver: string; // Assuming this is a user ID
  sender: {
    email: string;
    _id: string;
    username: string;
  };
  status: "pending" | "approved" | "rejected"; // Assuming possible status values, update as necessary
};

export default function FriendRequestsPage() {
  const { isAuthenticated, user } = useAuthStore((s) => s);

  const {
    data: requests,
    isFetching,
    refetch,
  } = useQuery({
    enabled: isAuthenticated,
    queryKey: ["friendrequests"],
    queryFn: async () => {
      const { data } = await axios<FriendRequest[]>({
        method: "get",
        endpoint: `/friendrequest/${user?._id}`,
      });

      return data?.data || [];
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (requestId: string) => {
      const { data } = await axios({
        method: "post",
        endpoint: `/friendrequest/${requestId}/acceptfriendrequest`,
      });
      if (data) {
        toast.success(data.message);
        refetch();
      }
    },
  });

  if (isFetching)
    return (
      <div className="h-[90vh] grid place-items-center">
        <Loader size={"3rem"} className="animate-spin" />
      </div>
    );
  return (
    <Card className="p-4 m-4 space-y-4">
      <CardTitle className="text-2xl text-primary font-semibold">
        Friend Requests
      </CardTitle>
      <CardContent className="space-y-3 p-0">
        {requests?.length === 0 ? (
          <p className="text-sm w-full text-center text-muted-foreground">
            No Friend Requests!!
          </p>
        ) : (
          requests?.map((request) => (
            <div
              key={request._id}
              className="flex items-center justify-between w-full gap-4 p-3 border border-secondary shadow-sm"
            >
              <h3>{request.sender.username}</h3>
              <div className="flex items-center gap-2">
                <Badge
                  role="button"
                  variant={"default"}
                  className="px-6 rounded-full flex items-center gap-1"
                  onClick={() => mutate(request._id)}
                >
                  Accept <Check size={"1.1rem"} />
                </Badge>
                <Badge
                  role="button"
                  variant={"destructive"}
                  className="px-6 rounded-full flex items-center gap-1"
                >
                  Reject <Trash size={"1.1rem"} />
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
