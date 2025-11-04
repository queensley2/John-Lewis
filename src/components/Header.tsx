"use client";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-black text-white flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-[16px] h-auto sm:h-[42px] w-full py-[12px] px-[66px] text-sm text-center sm:text-left">
      <div className="whitespace-normal break-words">
        New season coming! Discount 10% for all products! Checkout Now!{" "}
        <span
          suppressHydrationWarning
          className="min-w-[90px] bg-[#383838] text-center rounded-full tabular-nums px-3 py-1"
        >
          {now.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
