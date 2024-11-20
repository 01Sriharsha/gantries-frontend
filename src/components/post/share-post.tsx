"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, CopyCheck, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Post } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

type SharePostProps = {
  post: Post;
};

const SharePost = ({ post }: SharePostProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  const CopyIcon = copied ? CopyCheck : Copy;

  const postLink = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/network/post/${post._id}`;
    }
  }, [post]);

  const copyShareLink = () => {
    if (typeof window !== "undefined") {
      window.navigator.clipboard.writeText(postLink!);
      setCopied(true);
      toast.success("Copied!!");
      setTimeout(() => {
        ref.current?.click();
      }, 500);
    }
  };

  useEffect(() => {
    setCopied(false);
    return () => setCopied(false);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="text-sm flex items-center gap-1.5 text-primary"
          ref={ref}
        >
          <Share2 size={"1.1rem"} /> Share
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex items-center gap-2 p-2 rounded-xl w-full bg-gray-100">
        <CopyIcon
          role="button"
          size={"2.2rem"}
          className={cn(
            "p-2 bg-gray-300 text-black rounded-xl",
            copied && "text-green-600"
          )}
          onClick={copyShareLink}
        />
        <p className="p-2 bg-gray-300 text-black rounded-xl truncate w-[300px]">
          {postLink}
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default SharePost;
