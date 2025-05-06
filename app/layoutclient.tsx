"use client";

import Image from "next/image";
import { BizForm } from "@/modules/form";

export function LayoutClient({}: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left side */}
        <div className="hidden relative h-screen w-full md:flex flex-col gap-y-8 md:gap-y-[208px] ">
          {/* Image container */}
          <div className="relative flex-1">
            {" "}
            {/* Takes remaining space */}
            <Image
              src="/assets/brownofficelady.svg"
              alt="Office Lady"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
        {/* Right side */}
        <div className="px-6 bg-neutral-100 flex flex-col justify-center h-full">
          <BizForm />
        </div>
      </div>
    </div>
  );
}
