import Image from "next/image";
import { notFound } from "next/navigation";
import { Community, PaginationResponse, Post } from "@/types";
import PostGallery from "@/components/post/post-gallery";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CommunitySubscribeButton from "@/components/community/community-subscribe-button";
import fetchServer from "@/lib/fetch-server";

type CommunityPageProps = {
  params: {
    name: string;
  };
};

export default async function CommunityPage({ params }: CommunityPageProps) {
  const communityName = params.name;
  const { data, error } = await fetchServer<Community>({
    method: "get",
    endpoint: `/community/name/${communityName}`,
  });

  const community = data?.data || null;

  if (!communityName || error || !community) {
    notFound();
  }

  const { data: postsData } = await fetchServer<PaginationResponse<Post>>({
    method: "get",
    endpoint: `/post/community/${community._id}`,
  });

  const communityPosts = postsData?.data?.data || [];
  
  return (
    <div className="w-full">
      <div className="flex items-center gap-6 w-full bg-secondary p-6">
        <Image
          src={community.picture || ""}
          alt={community.name}
          width={200}
          height={200}
          className="h-40 w-40 object-contain rounded-full border border-gray-200 bg-white"
        />
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-bold text-primary capitalize">
            {community.name}
          </h1>
          <CommunitySubscribeButton community={community} />
        </div>
      </div>
      <div className="relative p-4">
        <Link
          href={`/network/community/${community.name}/post/create`}
          className="absolute right-2"
        >
          <Button>Create Post</Button>
        </Link>
        <PostGallery title="Top Posts" posts={communityPosts} />
      </div>
    </div>
  );
}
