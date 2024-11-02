import React, { PropsWithChildren } from "react";
import LatestEvents from "@/components/side-section/latest-events";
import YourProgress from "@/components/side-section/your-progress";
import Communities from "@/components/side-section/communities";

export default async function FeedLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full flex">
      <div className="max-w-[65%] w-full py-4 pl-4 pr-2">{children}</div>
      <aside className="hidden sm:block max-w-[35%] w-full space-y-4 py-4 px-2">
        <YourProgress />
        <LatestEvents />
        <Communities />
      </aside>
    </div>
  );
}
