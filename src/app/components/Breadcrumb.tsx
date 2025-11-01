"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string; 
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <>
                  <Link
                    href={item.href || "#"}
                    className="hover:text-black transition-colors"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
                </>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
