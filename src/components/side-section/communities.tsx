import Link from "next/link";
import Image from "next/image";
import axios from "@/lib/axios";
import { Community } from "@/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default async function Communities() {
  const { data } = await axios<Community[]>({
    method: "get",
    endpoint: "/community",
  });
  const communities = data?.data || [];
  return (
    <Card className="flex flex-col gap-4 border border-secondary p-2.5 rounded-none">
      <CardTitle className="text-xl text-primary font-semibold">
        Communities
      </CardTitle>
      <CardContent className="p-0 space-y-2.5">
        {communities.map((community, i) => (
          <Link
            key={i}
            href={`/network/community/${community.name}`}
            className="flex items-center gap-4"
          >
            <Image
              src={community.picture || ""}
              alt={community.name}
              width={60}
              height={60}
              className="h-8 w-8 object-contain rounded-full"
            />
            <span className="text-base hover:underline hover:text-primary capitalize">
              {community.name}
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
