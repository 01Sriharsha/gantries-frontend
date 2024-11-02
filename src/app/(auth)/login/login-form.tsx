"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useAuthStore } from "@/state/auth-state";
import Link from "next/link";

const LoginSchema = z.object({
  phone: z.string().length(10, "Invalid phone number"),
  password: z.string().min(1, "Password is required"),
});

type LoginSchema = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { authenticate } = useAuthStore((state) => state);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginSchema) => {
      const { data, error } = await axios({
        method: "post",
        body: values,
        endpoint: "/auth/login",
        showErrorToast: true,
      });
      if (error) {
        if (error.includes("NOT VERIFIED")) {
          return router.replace(`/verify?phone=${values.phone}`);
        }
      } else if (data) {
        authenticate(data.data);
        toast.success(data.message);
        form.reset();
        router.replace("/network/feed");
      }
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => mutate(v))}
        className="space-y-8 w-full p-4 bg-white rounded-xl shadow-xl border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-primary">
          Sign In To Your Account
        </h2>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Enter 10 digit phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter the password"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-sm text-muted-foreground text-center">
          <span>Don't have an account? </span>
          <Link href="/register" className="underline text-primary">
            Sign Up
          </Link>
        </div>
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
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
}
