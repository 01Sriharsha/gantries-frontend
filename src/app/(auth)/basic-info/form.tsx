"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import moment from "moment";
import AsyncSelect from "react-select/async";

import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { College, Tag } from "@/types";
import { useAuthStore } from "@/state/auth-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import InterestPlaceholder from "@/assets/images/interest-placeholder.png";

const BasicInfoSchema = z.object({
  role: z.string().min(1, { message: "Role is required" }),
  college: z
    .string()
    .min(3, { message: "College name must be at least 3 characters long" }),
  course: z.string().min(1, { message: "Course is required" }),
  yearOfEnding: z.string().min(4, { message: "Year is required" }),
  reasonForJoining: z.string().min(10, {
    message: "Reason must be at least 10 characters long and not a single word",
  }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  interests: z
    .array(z.string())
    .nonempty("At least one interest must be selected"),
});

type BasicInfoSchema = z.infer<typeof BasicInfoSchema>;

export default function TestForm() {
  const router = useRouter();
  const { user } = useAuthStore((state) => state);
  const form = useForm<BasicInfoSchema>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      role: "",
      college: "",
      course: "",
      yearOfEnding: "",
      reasonForJoining: "",
      dateOfBirth: "",
      interests: [],
    },
  });

  const selectedRole = form.watch("role");
  const selectedCollege = form.watch("college");
  const selectedCourse = form.watch("course");
  const selectedYear = form.watch("yearOfEnding");
  const selectedDOB = form.watch("dateOfBirth");

  const [tab, setTab] = useState<"tab1" | "tab2">("tab1");
  const isTab1 = tab === "tab1";

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axios<Tag[]>({
        method: "get",
        endpoint: "/tag",
      });

      if (data && data.data) return data.data;

      return [];
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

    
    console.log("colleges" , data);
    
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
    mutationFn: async (values: BasicInfoSchema) => {
      const dateOfBirth = moment(new Date(values.dateOfBirth)).format(
        "DD-MM-YYYY"
      );
      const obj = {
        ...values,
        user_id: user?._id,
        dateOfBirth,
        aim: values.reasonForJoining,
      };
      console.log(obj);

      const { data } = await axios({
        method: "post",
        endpoint: "/user/basic-info",
        body: obj,
        showErrorToast: true,
      });

      if (data && data.data) {
        toast.success(data.message);
        router.replace("/network");
      }
    },
  });

  console.log(user);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => mutate(v))}
        className="flex flex-col justify-between w-full h-[90vh] p-2"
      >
        <div className="space-y-6 w-full inline-flex flex-wrap items-end gap-2">
          <div className="w-full space-y-4">
            <h2 className="text-lg font-semibold">
              Let's setup your gantries account
            </h2>
            <Progress value={isTab1 ? 50 : 100} max={100} />
            <p>{isTab1 ? "Step 1" : "Step 2"}/2</p>
          </div>
          {isTab1 ? (
            <>
              <div className="fade-in flex items-end gap-2">
                <p className="w-fit text-xl">I am a</p>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="[&_div]:border-none [&_*]:focus:outline-none focus-visible:outline-none">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="text-xl w-36 border-b border-b-gray-400 rounded-none text-primary font-semibold capitalize">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">student</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              {selectedRole && (
                <div className="fade-in flex items-end gap-2">
                  <p className="w-fit text-xl">born in</p>
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="date"
                            type="date"
                            {...field}
                            className={cn(
                              "w-fit border-b border-b-gray-400 rounded-none",
                              selectedDOB &&
                                "text-xl text-primary font-semibold"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {selectedDOB && (
                <div className="fade-in flex items-end gap-2">
                  <p className="w-fit text-xl">studying at</p>
                  <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="border-b border-b-gray-400 w-[350px]">
                          <div className="[&_div]:border-none [&_div]:m-0 [&_div]:text-base">
                            <AsyncSelect
                              cacheOptions
                              defaultOptions
                              loadOptions={fetchColleges}
                              onChange={
                                (option: any) => field.onChange(option?.value) // Use value to store the college name
                              }
                              placeholder="Search your College"
                              noOptionsMessage={() => "Type to search"}
                              className="text-primary"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {selectedCollege && (
                <div className="fade-in flex items-end gap-2">
                  <p className="w-fit text-xl">in the course</p>
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="BE in computer science"
                            {...field}
                            className={cn(
                              "border-b border-b-gray-400 rounded-none focus-visible:ring-0",
                              selectedCourse &&
                                "text-primary font-semibold text-xl"
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {selectedCourse && (
                <div className="fade-in flex items-end gap-2">
                  <p className="w-fit text-xl">which ends in</p>
                  <FormField
                    control={form.control}
                    name="yearOfEnding"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Year"
                            {...field}
                            className={cn(
                              "border-b border-b-gray-400 rounded-none focus-visible:ring-0",
                              selectedYear &&
                                "text-primary font-semibold text-xl"
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {selectedYear && (
                <div className="fade-in flex items-end gap-2">
                  <p className="w-fit text-xl">
                    and I want to join gantries because
                  </p>
                  <FormField
                    control={form.control}
                    name="reasonForJoining"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Reason"
                            {...field}
                            className={cn(
                              "w-fit border-b border-b-gray-400 rounded-none focus-visible:ring-0",
                              form.watch("reasonForJoining") &&
                                "text-primary font-semibold text-xl"
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <span>.</span>
                </div>
              )}
            </>
          ) : (
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center">
                    {tags?.map((tag) => (
                      <div key={tag._id}>
                        <Checkbox
                          id={tag._id}
                          value={tag.name}
                          checked={field.value.some((t) => t === tag.name)}
                          onCheckedChange={(e) =>
                            !!e.valueOf()
                              ? field.onChange([...field.value, tag.name])
                              : field.onChange(
                                  field.value.filter((t) => t !== tag.name)
                                )
                          }
                          className="hidden"
                        />
                        <FormLabel
                          htmlFor={tag._id}
                          className={cn(
                            "border-2 border-transparent flex flex-col gap-2 justify-between items-center rounded-xl h-28 w-32 py-2 px-6 cursor-pointer",
                            field.value.some((t) => t === tag.name) &&
                              "border-primary"
                          )}
                        >
                          <Image
                            src={InterestPlaceholder}
                            alt={tag.name}
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                          <span className="capitalize">{tag.name}</span>
                        </FormLabel>
                      </div>
                    ))}
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex items-center gap-4 justify-end my-3">
          {isTab1 ? (
            <Button
              type="button"
              onClick={() => setTab("tab2")}
              className="rounded-full px-10 flex items-center gap-2"
            >
              Next <ArrowRight size={"1.1rem"} />
            </Button>
          ) : (
            <>
              <Button
                variant={"secondary"}
                type="button"
                onClick={() => setTab("tab1")}
                className="rounded-full px-10 flex items-center gap-2"
              >
                <ArrowLeft />
                Step 1
              </Button>
              <Button
                isLoading={isPending}
                type="submit"
                className="rounded-full px-10 flex items-center gap-2"
              >
                Save <ArrowRight size={"1.1rem"} />
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
