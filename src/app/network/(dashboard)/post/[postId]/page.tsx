import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Comment, Post } from "@/types";
import axios from "@/lib/axios";
import PostCard from "@/components/post/post-card";
import CommentSection from "./comment-section";

type PostPageProps = {
  params: { postId: string };
};

// Generate metadata dynamically
export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const postId = params.postId;
  const { data, error } = await axios<Post>({
    method: "get",
    endpoint: `/post/${postId}`,
  });
  const post = data?.data;
  return {
    title: post?.title || "Post Page",
    description: `${post?.title} by ${post?.createdBy.username}`,
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const postId = params.postId;

  if (!postId) redirect("/network/feed");

  const { data, error } = await axios<Post>({
    method: "get",
    endpoint: `/post/${postId}`,
  });

  if (error || !data || !data.data) {
    notFound();
  }

  const post = data.data;

  const postCommentsResponse = await axios<Comment[]>({
    method: "get",
    endpoint: `/comment/${postId}`,
  });

  const postComments = postCommentsResponse.data?.data || [];

  return (
    <div className="p-4 space-y-4">
      <PostCard post={post} />
      <hr className="border-b border-b-gray-200 w-full" />
      <CommentSection postId={post._id} comments={postComments} />
    </div>
  );
}
