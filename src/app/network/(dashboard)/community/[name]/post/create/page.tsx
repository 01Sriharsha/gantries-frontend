import axios from "@/lib/axios";
import { Community } from "@/types";
import { notFound } from "next/navigation";
import CreatePostForm from "./create-post-form";

type CreateCommunityPostPageProps = {
  params: {
    name: string;
  };
};

export default async function CreateCommunityPostPage({
  params,
}: CreateCommunityPostPageProps) {
  const communityName = params.name;
  const { data, error } = await axios<Community>({
    method: "get",
    endpoint: `/community/name/${communityName}`,
  });

  const community = data?.data || null;

  if (!communityName || error || !community) {
    notFound();
  }
  return (
    <div>
      <CreatePostForm communityId={community._id} tags={[]} />
    </div>
  );
}
