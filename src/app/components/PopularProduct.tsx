"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  rating: number;
  sold: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Whistle",
    price: 26,
    description: "Wide Leg Cropped Jeans, Denim",
    rating: 4.8,
    sold: 1238,
    image: "/product1.png",
  },
  {
    id: 2,
    name: "John Lewis ANYDAY",
    price: 26,
    description: "Long Sleeve Utility Shirt, Navy",
    rating: 4.8,
    sold: 1238,
    image: "/product2.png",
  },
  {
    id: 3,
    name: "John Lewis ANYDAY",
    price: 32,
    description: "Stripe Curved Hem Shirt, Blue",
    rating: 4.5,
    sold: 620,
    image: "/product3.png",
  },
  {
    id: 4,
    name: "John Lewis ANYDAY",
    price: 40,
    description: "Denim Overshirt, Mid Wash",
    rating: 4.6,
    sold: 238,
    image: "/product4.png",
  },
  {
    id: 5,
    name: "John Lewis",
    price: 79,
    description: "Linen Blazer, Navy",
    rating: 4.8,
    sold: 1238,
    image: "/product5.png",
  },
];

export default function PopularProduct() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-20 mb-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl text-[#141414] font-semibold">
          Related Product
        </h2>
        <button className="text-[#525252] hover:underline text-base">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg  transition p-2">
            <div className="relative w-full h-56">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 20vw"
              />
            </div>

            <div className="flex flex-col mt-2 gap-2">
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="font-semibold text-lg text-[#292929]">
                    {product.name}
                  </h3>
                  <p className="font-semibold text-[#141414] text-xl mt-1">
                    ${product.price}
                  </p>
                </div>
                <p className="text-gray-500 text-base text-[#7A7A7A]">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center text-xs text-gray-600 mt-1">
                <Star className="w-[24] h-[24] text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-base text-[#0B0F0E]">
                  {product.rating}
                </span>
                <span className="mx-1">·</span>
                <span className="text-base text-[#666666]">
                  {product.sold} Sold
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
