import { Metadata } from "next";
import axios from "@/lib/axios";
import { PaginationResponse, Post } from "@/types";
import { APP_TITLE } from "@/utils/constants";
import PostGallery from "@/components/post/post-gallery";

export const metadata: Metadata = {
  title: "Feed",
  description: `Feed page of ${APP_TITLE}`,
};

export default async function FeedPage() {
  const { data } = await axios<PaginationResponse<Post>>({
    method: "get",
    endpoint: "/post",
  });

  const posts = data?.data?.data || [];
  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        <PostGallery title="For You" posts={posts} />
      ) : (
        <p className="text-sm text-center text-muted-foreground">No Posts!!</p>
      )}
    </div>
  );
}
