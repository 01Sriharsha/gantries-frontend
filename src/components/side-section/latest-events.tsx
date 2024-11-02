import Link from "next/link";
import { Tag } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function LatestEvents() {
  return (
    <Card className="flex flex-col gap-4 border border-secondary p-2.5 rounded-none">
      <CardTitle className="text-xl text-primary font-semibold">
        Latest Events
      </CardTitle>
      <CardContent className="p-0 space-y-2.5">
        <EventCard title="AI-ML Workshop" />
        <EventCard title="Cybersecurity Workshop" />
        <EventCard title="Image processing Workshop" />
      </CardContent>
    </Card>
  );
}

const EventCard = ({ title }: { title: string }) => (
  <Link href="/" className="flex items-center gap-2">
    <Tag size={"1.1rem"} />
    <span className="text-base hover:underline hover:text-primary">
      {title}
    </span>
  </Link>
);
