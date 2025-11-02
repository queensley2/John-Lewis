"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  ChevronDown,
} from "lucide-react";

export default function Footer() {
  const icons = [Facebook, Twitter, Instagram, Linkedin];
  return (
    <footer className="bg-[#F2F2F2] text-[#0B0F0E] px-10 md:px-20 pt-12 pb-6">
      {/* === Top Section === */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-20">
        {/* === Left: Logo & Subscribe === */}
        <div className="flex-1 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/image 16.png"
              alt="Company Logo"
              width={170}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Email Subscribe */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center border-b border-black w-full max-w-sm"
          >
            <input
              type="email"
              placeholder="Get latest offers to your inbox"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-black placeholder:text-black focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-black hover:bg-[#FF6B22] p-2 text-white rounded-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-4">
            {icons.map((Icon, index) => (
              <Link
                href="#"
                key={index}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-[#FE7622] hover:text-white transition"
              >
                <Icon className="w-4 h-4 text-black" />
              </Link>
            ))}
          </div>
        </div>

        {/* === Right: Quick Links === */}
        <div className="flex flex-col w-full md:w-auto gap-10 md:flex-row md:gap-20">
          {/* === MOBILE VIEW: Two columns + one below === */}
          <div className="grid grid-cols-2 gap-8 md:hidden">
            {/* Shop */}
            <div>
              <h3 className="text-[#141414] font-semibold text-lg mb-4">
                Shop
              </h3>
              <ul className="space-y-2 text-sm text-[#292929]">
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    My account
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-[#141414] font-semibold text-lg mb-4">
                Information
              </h3>
              <ul className="space-y-2 text-sm text-[#292929]">
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Cookies Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Company (below on mobile) */}
          <div className="md:hidden">
            <h3 className="text-[#141414] font-semibold text-lg mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-[#292929]">
              <li>
                <Link href="#" className="hover:text-[#FE7622]">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FE7622]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FE7622]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FE7622]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* === DESKTOP VIEW: All 3 side by side === */}
          <div className="hidden md:flex flex-wrap gap-20">
            {/* Shop */}
            <div>
              <h3 className="text-[#141414] font-semibold text-lg mb-4">
                Shop
              </h3>
              <ul className="space-y-2 text-sm text-[#292929]">
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    My account
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-[#141414] font-semibold text-lg mb-4">
                Information
              </h3>
              <ul className="space-y-2 text-sm text-[#292929]">
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Cookies Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-[#141414] font-semibold text-lg mb-4">
                Company
              </h3>
              <ul className="space-y-2 text-sm text-[#292929]">
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#FE7622]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* === Bottom Line === */}
      <div className="flex flex-col md:flex-row border-t border-gray-300 mt-10 pt-6 justify-between items-center text-center text-sm text-gray-600 gap-4">
        <p>© John Lewis plc 2001 - 2024</p>
        <div className="flex gap-6">
          <span className="flex items-center">
            English <ChevronDown className="w-5 h-5 ml-1" />
          </span>
          <span className="flex items-center">
            USD <ChevronDown className="w-5 h-5 ml-1" />
          </span>
        </div>
      </div>
    </footer>
  );
}
