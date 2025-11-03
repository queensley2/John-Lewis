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
import React, { useState, useRef, useEffect } from "react";

export default function Footer() {
  const icons = [Facebook, Twitter, Instagram, Linkedin];

  // Subscribe form state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation: basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }

    // "Save" email locally (or console.log for demo purposes)
    console.log("Subscribed email:", email);

    // Show success feedback
    setStatus("success");
    setEmail("");

    // Auto-reset status after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  // Dropdown States
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({
    name: "English",
    flag: "/eng.jpg",
  });
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: "USD",
    symbol: "$",
  });

  const languages = [
    { name: "English", flag: "/eng.jpg" },
    { name: "Français", flag: "/france.jpg" },
    { name: "Español", flag: "/spain.jpg" },
  ];

  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "NGN", symbol: "₦" },
  ];

  // Close dropdowns when clicking outside
  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        langRef.current &&
        !langRef.current.contains(e.target as Node) &&
        currRef.current &&
        !currRef.current.contains(e.target as Node)
      ) {
        setIsLangOpen(false);
        setIsCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer className="bg-[#F2F2F2] text-[#0B0F0E] px-10 md:px-20 pt-12 pb-6">
      {/*  Top Section  */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-20">
        {/*  Left: Logo & Subscribe  */}
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
            onSubmit={handleSubscribe}
            className="flex items-center border-b border-black w-full max-w-sm"
          >
            <input
              type="email"
              placeholder="Get latest offers to your inbox"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-black placeholder:text-black focus:outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black hover:bg-[#FF6B22] p-2 text-white rounded-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Status Message */}
          {status === "success" && (
            <p className="text-green-600 text-sm mt-1">
              Thanks! You are subscribed.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm mt-1">
              Please enter a valid email.
            </p>
          )}

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

        {/*  Right: Quick Links  */}
        <div className="flex flex-col w-full md:w-auto gap-10 md:flex-row md:gap-20">
          {/* MOBILE VIEW*/}
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

          {/* Company */}
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

          {/*  DESKTOP VIEW */}
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

      {/*  Bottom Line  */}
      <div className="flex flex-col md:flex-row border-t border-gray-300 mt-10 pt-6 justify-between items-center text-center text-sm text-gray-600 gap-4 relative">
        <p>© John Lewis plc 2001 - 2024</p>

        {/* Language + Currency Dropdowns */}
        <div className="flex gap-6 relative">
          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsCurrencyOpen(false);
              }}
              className="flex items-center hover:text-[#FE7622] transition"
            >
              <Image
                src={selectedLang.flag}
                alt={selectedLang.name}
                width={18}
                height={18}
                className="mr-2 rounded-full"
              />
              {selectedLang.name}
              <ChevronDown
                className={`w-5 h-5 ml-1 transition-transform ${
                  isLangOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLangOpen && (
              <div className="absolute bottom-8 md:bottom-auto right-0 mb-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.name}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLangOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    <Image
                      src={lang.flag}
                      alt={lang.name}
                      width={18}
                      height={18}
                      className="mr-2 rounded-full"
                    />
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Dropdown */}
          <div className="relative" ref={currRef}>
            <button
              onClick={() => {
                setIsCurrencyOpen(!isCurrencyOpen);
                setIsLangOpen(false);
              }}
              className="flex items-center hover:text-[#FE7622] transition"
            >
              {selectedCurrency.code}
              <ChevronDown
                className={`w-5 h-5 ml-1 transition-transform ${
                  isCurrencyOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCurrencyOpen && (
              <div className="absolute bottom-8 md:bottom-auto right-0 mb-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {currencies.map((cur) => (
                  <button
                    key={cur.code}
                    onClick={() => {
                      setSelectedCurrency(cur);
                      setIsCurrencyOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    {cur.symbol} {cur.code}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
