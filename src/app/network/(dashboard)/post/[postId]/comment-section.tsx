"use client";

import Image from "next/image";
import { useState } from "react";
import { Comment } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import moment from "moment";

type CommentSectionProps = {
  postId: string;
  comments: Comment[];
};

const CommentSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

type CommentSchema = z.infer<typeof CommentSchema>;

export default function CommentSection({
  postId,
  comments: InitialComments,
}: CommentSectionProps) {
  const form = useForm<CommentSchema>({
    defaultValues: {
      content: "",
    },
  });

  const [comments, setComments] = useState(InitialComments);

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: CommentSchema) => {
      const { data } = await axios<Comment>({
        method: "post",
        endpoint: "/comment",
        body: { ...values, postId },
        showErrorToast: true,
      });

      if (data) {
        toast.success(data.message);
        setComments((prev) => [data.data!, ...prev]);
        form.reset();
      }
    },
  });
  return (
    <section id="comments" className="space-y-3">
      <h3 className="text-xl text-primary font-bold">
        Comments ({comments.length})
      </h3>
      {/* Comment Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => mutate(v))}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Comment here..."
                    rows={3}
                    className="focus-visible:ring-gray-300 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              isLoading={isPending}
              disabled={isPending}
              type="submit"
              size={"sm"}
              className="rounded-full px-6 flex items-center gap-1"
            >
              Submit <ArrowRight size={"1.1rem"} />
            </Button>
          </div>
        </form>
      </Form>

      {/* Display Comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="flex flex-col gap-2 border border-secondary w-full"
          >
            <div className="flex items-center gap-2 border-b border-b-secondary px-4 py-2">
              <Image
                src={"/images/nature.jpg"}
                alt={comment.createdBy.username}
                width={70}
                height={70}
                className="h-8 w-8 object-cover rounded-full"
              />
              <h4 className="text-base font-semibold capitalize">
                {comment.createdBy.username}
              </h4>
              <time className="text-muted-foreground text-sm">
                {" "}
                • {moment(comment.createdAt).fromNow()}
              </time>
            </div>
            <div className="px-4 py-2">
              <p>{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          No Comments!!
        </p>
      )}
    </section>
  );
}
