"use client";

import { Post } from "@/types";
import { useState } from "react";
import PostCard from "./post-card";
import { cn } from "@/lib/utils";

type PostGalleryProps = {
  posts: Post[];
  title?: string;
  className?: string;
};

export default function PostGallery({
  posts: InitialPosts,
  title,
  className,
}: PostGalleryProps) {
  const [posts, setPosts] = useState(InitialPosts);

  return (
    <div className={cn("my-5", className)}>
      <h2 className="text-2xl font-semibold text-primary mb-2">{title}</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
