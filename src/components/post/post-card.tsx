"use client";

import Image from "next/image";
import { Post } from "@/types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image1 from "@/assets/images/bg3.png";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import SharePost from "./share-post";
import { useAuthStore } from "@/state/auth-state";

type PostCardProps = {
  post: Post;
  className?: string;
};

export default function PostCard({ post, className }: PostCardProps) {
  const maxContentLength = "full";
  post.content =
    maxContentLength === "full"
      ? post.content
      : post.content.substring(0, maxContentLength);

  const { isAuthenticated } = useAuthStore();

  const [isLiked, setIsLiked] = useState(post.isLiked);

  const { mutate: likePost, isPending } = useMutation({
    mutationFn: async () => {
      const { data, error } = await axios<Post>({
        method: "post",
        endpoint: `/post/${post._id}/like`,
      });

      if (error) setIsLiked(false);
      else if (data && data.data) {
        toast.info(data.message);
        setIsLiked(data.data.isLiked);
        console.log(data);
      }
    },
  });
  return (
    <Card className={cn("border border-secondary rounded-none", className)}>
      <div className="flex items-center gap-3 border-b border-b-gray-200 p-2">
        <Image
          src={Image1}
          alt={post.createdBy.username}
          width={70}
          height={70}
          className="h-10 w-10 rounded-full object-contain border border-secondary"
        />
        <h3 className="font-semibold capitalize">{post.createdBy.username}</h3>
      </div>
      <CardContent className="p-4 flex flex-col gap-2 w-full">
        <h2 className="text-lg font-bold capitalize">
          <Link
            href={`/network/post/${post._id}`}
            className="text-primary hover:underline"
          >
            {post.title}
          </Link>
        </h2>
        <div
          className="w-full text-black [&_*]:text-base"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
          {post.images.map((img, i) => (
            <figure key={i} className="h-32 w-full border border-gray-100">
              <Image
                src={img}
                alt={"image " + i.toString()}
                width={200}
                height={200}
                className="h-full w-full object-contain"
              />
            </figure>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-2 flex items-center gap-4">
        <button
          disabled={isPending}
          onClick={() => {
            if (isAuthenticated) {
              setIsLiked(!isLiked);
              likePost();
            } else {
              toast.info("Login to continue!");
            }
          }}
        >
          <Heart size={"1.1rem"} color="red" fill={isLiked ? "red" : "white"} />
        </button>
        <SharePost post={post} />
      </CardFooter>
    </Card>
  );
}
