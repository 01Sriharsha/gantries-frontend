"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { User } from "@/types";
import { useAuthStore } from "@/state/auth-state";

const VerifyOTPSchema = z.object({
  otp: z.string().length(6, {
    message: "Your one-time password must be 6 digits.",
  }),
});

type VerifyOTPSchema = z.infer<typeof VerifyOTPSchema>;

export default function VerifyForm({ phone }: { phone: string }) {
  const router = useRouter();
  const { authenticate } = useAuthStore((state) => state);

  const form = useForm<VerifyOTPSchema>({
    resolver: zodResolver(VerifyOTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: VerifyOTPSchema) => {
      const { data } = await axios<User>({
        method: "post",
        endpoint: "/auth/verify",
        body: {
          phone,
          otp: values.otp,
        },
        showErrorToast: true,
      });
      if (data) {
        console.log(data);
        toast.success(data.message);
        authenticate(data.data!);
        router.replace("/basic-info")
      }
    },
  });

  if (!phone) return null;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => mutate(v))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="mx-auto">
              <FormLabel>One Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4 justify-between">
          <Button
            variant="ghost"
            type="button"
            onClick={() => router.back()}
            className="rounded-full text-primary flex items-center gap-2 hover:bg-primary/30"
          >
            <ArrowLeft /> <span>Go Back</span>
          </Button>
          <Button
            isLoading={isPending}
            type="submit"
            className="rounded-full px-10"
          >
            Verify
          </Button>
        </div>
      </form>
    </Form>
  );
}
