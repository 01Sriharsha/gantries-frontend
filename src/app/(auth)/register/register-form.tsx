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

export const RegisterSchema = z.object({
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  phone: z.string().length(10, { message: "Invalid phone number" }),
});

type RegisterSchema = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const { authenticate } = useAuthStore((state) => state);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      phone: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterSchema) => {
      const { data, error } = await axios({
        method: "post",
        body: values,
        endpoint: "/auth/register",
        showErrorToast: true,
      });
      if (data) {
        authenticate(data.data);
        toast.success(data.message);
        form.reset();
        router.replace("/verify");
      }
      if (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => mutate(v))}
        className="space-y-4 w-full p-4 bg-white rounded-xl shadow-xl border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-primary">
          Create A New Account
        </h2>
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter firstname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter lastname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          <span>Already have an account? </span>
          <Link href="/login" className="underline text-primary">
            Sign In
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
