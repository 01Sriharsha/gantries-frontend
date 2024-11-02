import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import axios from "@/lib/axios";
import { useAuthStore } from "@/state/auth-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const LogoutModal = () => {
  const { logout } = useAuthStore((state) => state);

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        method: "post",
        endpoint: "/auth/logout",
      });
      if (data) toast.info(data?.message || "Logged out successfully!");
      logout();
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-3 p-2 text-sm">
          <LogOut size={"1.1rem"} />
          <span>Logout</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Are you sure want to logout?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="w-full flex justify-center items-center gap-6">
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                isLoading={isPending}
                size={"sm"}
                onClick={() => mutate()}
              >
                Yes
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
