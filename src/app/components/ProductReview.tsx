"use client";

import {
  Star,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import React from "react";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Darrell Steward",
    avatar: "/profile.png",
    rating: 5,
    date: "July 2, 2020 03:25 PM",
    content: "This is an amazing product I have.",
    likes: 128,
  },
  {
    id: 2,
    name: "Darlene Robertson",
    avatar: "/profile.png",
    rating: 5,
    date: "July 2, 2020 10:03 PM",
    content: "This is an amazing product I have.",
    likes: 32,
  },
  {
    id: 3,
    name: "Kathryn Murphy",
    avatar: "/profile.png",
    rating: 5,
    date: "June 25, 2020 10:03 PM",
    content: "This is an amazing product I have.",
    likes: 98,
  },
  {
    id: 4,
    name: "Ronald Richards",
    avatar: "/profile.png",
    rating: 5,
    date: "July 1, 2020 10:41 AM",
    content: "This is an amazing product I have.",
    likes: 124,
  },
];

export default function ProductReview() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showRatings, setShowRatings] = useState(true);
  const [showTopics, setShowTopics] = useState(true);

  const avgRating = 4.5;
  const totalReviews = 1238;

  const ratingCounts: Record<number, number> = {
    5: 828,
    4: 38,
    3: 10,
    2: 4,
    1: 0,
  };

  const totalCount = Object.values(ratingCounts).reduce((a, b) => a + b, 0);

  // Circle stroke values
  const circleRadius = 40;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const circleProgress = (avgRating / 5) * circleCircumference;

  // --- Like & Dislike handlers ---
  const handleLike = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleDislike = (id: number) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id && r.likes > 0 ? { ...r, likes: r.likes - 1 } : r
      )
    );
  };

  return (
    <section className="w-full max-w-6xl mx-auto mt-20 mb-20 bg-white">
      <h2 className="text-2xl text-[#141414] font-semibold mb-4">
        Product Reviews
      </h2>

      {/* === TOP SECTION === */}
      <div className="outline-dashed rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        {/* Left: Circular Rating */}
        <div className="flex items-center justify-center md:justify-start gap-6">
          <div className="relative w-24 h-24">
            <svg
              className="w-24 h-24 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r={circleRadius}
                stroke="#e5e7eb"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r={circleRadius}
                stroke="#facc15"
                strokeWidth="5"
                fill="none"
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleCircumference - circleProgress}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl text-[#0B0F0E] font-semibold">
                {avgRating}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(avgRating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              from {totalReviews.toLocaleString()} reviews
            </p>
          </div>
        </div>

        {/* Right: Rating Bars */}
        <div className="flex flex-col justify-center space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div
              key={star}
              className="flex items-center text-[#0B0F0E] text-base"
            >
              <span className="w-4">{star}</span>
              <Star className="w-[20px] h-[20px] text-yellow-500 fill-yellow-500 mx-1" />
              <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                <div
                  className="h-[8px] bg-black rounded-full transition-all"
                  style={{
                    width: `${(ratingCounts[star] / totalCount) * 100}%`,
                  }}
                />
              </div>
              <span className="text-gray-500">{ratingCounts[star]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* === BOTTOM SECTION === */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filters */}
        <div className="hidden md:block col-span-1 outline-dashed rounded-lg p-4 space-y-6">
          <h3 className="font-semibold text-[#292929] text-xl">
            Reviews Filter
          </h3>

          {/* Rating Filter */}
          <div>
            <button
              onClick={() => setShowRatings(!showRatings)}
              className="flex items-center justify-between w-full text-sm font-medium mb-2"
            >
              <span className="text-base font-semibold text-[#141414]">
                Rating
              </span>
              {showRatings ? (
                <ChevronUp className="w-4 h-4 text-[#141414]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#141414]" />
              )}
            </button>

            {showRatings && (
              <div className="space-y-2 pl-1">
                {[5, 4, 3, 2, 1].map((star) => (
                  <label
                    key={star}
                    className="flex items-center gap-2 text-base font-semibold text-[#818B9C] cursor-pointer"
                  >
                    <input type="checkbox" className="accent-[#FE7622]" />
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{star}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Review Topics */}
          <div>
            <button
              onClick={() => setShowTopics(!showTopics)}
              className="flex items-center justify-between w-full text-sm font-medium mb-2"
            >
              <span className="text-base font-semibold text-[#141414]">
                Review Topics
              </span>
              {showTopics ? (
                <ChevronUp className="w-4 h-4 text-[#141414]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#141414]" />
              )}
            </button>

            {showTopics && (
              <div className="space-y-2 text-base font-semibold text-[#818B9C] pl-1">
                {[
                  "Product Quality",
                  "Seller Service",
                  "Product Price",
                  "Shipment",
                  "Match with Description",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input type="checkbox" className="accent-[#FE7622]" />
                    {item}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Reviews */}
        <div className="col-span-3 space-y-6">
          <h2 className="text-xl text-[#292929] font-semibold">Review Lists</h2>

          {/* Tabs */}
          <div className="flex gap-2 text-sm border-b pb-2">
            <button className="px-3 py-1 border border-[#EBEBEB] rounded-lg bg-[#EBEBEB] text-[#141414] text-sm font-medium">
              All Reviews
            </button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
              With Photo & Video
            </button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
              With Description
            </button>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="outline-dashed rounded-lg p-4 hover:shadow-sm transition"
              >
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>

                <p className="font-semibold text-[#141414] text-lg mb-1">
                  {review.content}
                </p>
                <p className="text-base text-[#818B9C] mb-3">{review.date}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <span className="text-base text-[#0B0F0E] font-medium">
                      {review.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 text-sm">
                    <button
                      onClick={() => handleLike(review.id)}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      <ThumbsUp className="w-4 h-4" /> {review.likes}
                    </button>
                    <button
                      onClick={() => handleDislike(review.id)}
                      className="flex items-center gap-1 hover:text-red-600"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {[1, 2, "...", 10, ">"].map((p) => (
              <button
                key={p}
                className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
