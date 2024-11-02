"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import AsyncSelect from "react-select/async";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "@/lib/axios";
import { College } from "@/types";
import { useState } from "react";

const BasicInfoSchema = z.object({
  college: z
    .string()
    .min(3, { message: "College name must be at least 3 characters long" }),
  course: z.string().min(1, { message: "Course is required" }),
  yearOfEnding: z.string().min(4, { message: "Year is required" }),
  reasonForJoining: z
    .string()
    .min(10, {
      message:
        "Reason must be at least 10 characters long and not a single word",
    })
    .refine((value) => value.trim().split(" ").length > 1, {
      message: "Reason must be more than one word",
    }),
  plan: z.string().min(1, { message: "Plan is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  interests: z.array(z.string()).nonempty("At least one interest is required"),
});

type BasicInfoSchema = z.infer<typeof BasicInfoSchema>;

export default function BasicInfoForm() {
  const router = useRouter();
  const form = useForm<BasicInfoSchema>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      college: "",
      course: "",
      yearOfEnding: "",
      reasonForJoining: "",
      plan: "",
      dateOfBirth: "",
      interests: [],
    },
  });

  const fetchColleges = async (
    inputValue: string,
    callback: (options: { label: string; value: string }[]) => void
  ): Promise<{ label: string; value: string }[]> => {
    if (!inputValue) {
      callback([]);
      return [];
    }
    const { data, error } = await axios<College[]>({
      method: "get",
      endpoint: `/college?query=${inputValue}`,
    });

    if (data && data.data) {
      const options = data.data.map((college) => ({
        label: `${college.collegeName}, ${college.district}, ${college.state}`,
        value: college.collegeName, // Use collegeName as the value
      }));

      // Add user-entered option to the list if it doesn't exist
      if (
        !options.find(
          (option) => option.label.toLowerCase() === inputValue.toLowerCase()
        )
      ) {
        options.push({
          label: `Use "${inputValue}" as college name`,
          value: inputValue,
        });
      }

      callback(options);
      return options;
    } else if (error) {
      console.error("Error fetching colleges:", error);
      callback([
        { label: `Use "${inputValue}" as college name`, value: inputValue },
      ]);
    }
    return [
      { label: `Use "${inputValue}" as college name`, value: inputValue },
    ];
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: BasicInfoSchema) => {},
  });
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => mutate(v))}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#5f3a9e]">College</FormLabel>
                <FormControl>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={fetchColleges}
                    onChange={
                      (option: any) => field.onChange(option?.value) // Use value to store the college name
                    }
                    placeholder="Search your College"
                    noOptionsMessage={() => "Type to search"}
                    className="border-[#5f3a9e] focus:border-[#4b2f79]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#5f3a9e]">Course</FormLabel>
                <FormControl>
                  <Input
                    placeholder="BE in computer science"
                    {...field}
                    className="border-[#5f3a9e] focus:border-[#4b2f79]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearOfEnding"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#5f3a9e]">
                  Year of ending of Course
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Year"
                    {...field}
                    className="border-[#5f3a9e] focus:border-[#4b2f79]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="date" className="text-primary">
                  Date of birth
                </FormLabel>
                <FormControl className="w-full">
                  <Input id="date" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reasonForJoining"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#5f3a9e]">
                  Why are you joining Gantries?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Reason"
                    {...field}
                    className="border-[#5f3a9e] focus:border-[#4b2f79]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#5f3a9e]">Your Plan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Plan"
                    {...field}
                    className="border-[#5f3a9e] focus:border-[#4b2f79]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
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
    </div>
  );
}
