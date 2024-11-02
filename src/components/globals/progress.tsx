"use client";

import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Circle, Line } from "rc-progress";

type ProgressProps = {
  type: "Line" | "Circle";
  title?: string;
  percent: number;
  trailWidth?: number;
  strokeWidth?: number;
  className?: string;
} & PropsWithChildren;

export default function Progress({
  type = "Line",
  percent = 10,
  className,
  children,
  title,
  trailWidth = 4,
  strokeWidth = 4,
}: ProgressProps) {
  const Comp = type === "Line" ? Line : Circle;
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className={cn(
          "relative grid place-items-center",
          type === "Line" ? "w-full h-6" : "w-[150px] h-[150px]",
          className
        )}
      >
        <Comp
          percent={percent}
          trailColor="#E3DCE8"
          trailWidth={trailWidth}
          strokeColor="#5F3A9F"
          strokeWidth={strokeWidth}
          className="absolute w-full h-full"
        />
        {children ?? (
          <p className="text-xl font-bold text-primary">{percent}%</p>
        )}
      </div>
      {title && <p className="text-sm font-medium text-center">{title}</p>}
    </div>
  );
}
