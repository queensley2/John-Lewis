"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/image 16.png";
import {
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  User,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" ">
      <div className="flex justify-between h-[60px] px-5 md:px-10">
        {/* === Logo === */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="brand logo" width={140} height={32} priority />
        </Link>

        {/* === Desktop Menu === */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
          <Search className="w-5 h-5 cursor-pointer hover:text-black" />
          <Link
            href="#"
            className="flex items-center gap-1 text-base text-[#141414] font-medium hover:text-black"
          >
            Categories <ChevronDown className="w-4 h-4" />
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-base text-[#141414] font-medium hover:text-black"
          >
            Sign in <User className="w-4 h-4" />
          </Link>
          <Heart className="w-5 h-5 cursor-pointer hover:text-red-500" />
          <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-black" />
        </div>

        {/* === Mobile Icons === */}
        <div className="flex items-center gap-5 md:hidden">
          <Search className="w-5 h-5 cursor-pointer hover:text-black" />
          <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-black" />
          <button
            className="text-gray-700 hover:text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* === Mobile Dropdown Menu === */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-6 flex flex-col gap-4 text-gray-800 text-base font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 hover:text-[#FE7622]"
          >
            <ChevronDown className="w-4 h-4" /> Categories
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 hover:text-[#FE7622]"
          >
            <User className="w-4 h-4" /> Sign in
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 hover:text-[#FE7622]"
          >
            <Heart className="w-4 h-4" /> Wishlist
          </Link>
        </div>
      )}
    </nav>
  );
}
