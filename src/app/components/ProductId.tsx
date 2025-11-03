"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingCart,
  CreditCard,
  Heart,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Breadcrumb from "./Breadcrumb";

export default function ProductId() {
  const product = {
    id: 1,
    name: "Long Sleeve Overshirt, Khaki, 6",
    price: 125.99,
    discountedPrice: 99.99,
    totalSold: 1238,
    description:
      "This long sleeve khaki overshirt is crafted from premium cotton with a relaxed fit. Perfect for layering in all seasons. Boba etiam ut bulla tea est potus dilectus singulari compositione saporum et textuum, quae in Taiwan annis 1980 orta sunt. Boba refert ad pilas masticas tapiocas in fundo potus inventas, quae typice lacte tea nigro sapiuntur. Boba phaenomenon.",
    images: [
      "/image1.png",
      "/image3.png",
      "/image4.png",
      "/image5.png",
      "/image7.png",
    ],
    rating: 4.5,
    colors: [
      { name: "Khaki", hex: "#C5A572" },
      { name: "Olive", hex: "#7C6A47" },
      { name: "Beige", hex: "#D1C7B7" },
      { name: "Dark Brown", hex: "#3E3B32" },
    ],
    sizes: [6, 8, 10, 14, 18, 20],
  };

  // === States ===
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const router = useRouter();

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      image: selectedImage,
      quantity: 1,
    });
  };

  //  Save wishlist when updated 
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  //  Handle wishlist toggle 
  const toggleWishlist = () => {
    if (wishlist.includes(selectedImage)) {
      setWishlist(wishlist.filter((img) => img !== selectedImage));
    } else {
      setWishlist([...wishlist, selectedImage]);
    }
  };

  //  Handle image download 
  const handleDownload = async () => {
    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedImage.split("/").pop() || "image.jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Navigate images 
  const handlePrev = () => {
    const currentIndex = product.images.indexOf(selectedImage);
    const prevIndex =
      (currentIndex - 1 + product.images.length) % product.images.length;
    setSelectedImage(product.images[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = product.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % product.images.length;
    setSelectedImage(product.images[nextIndex]);
  };

  const breadcrumbItems = [
    { label: "Homepage", href: "/" },
    { label: "Women", href: "/women" },
    { label: "Women's Shirts & Tops", href: "/women/shirts-tops" },
    { label: product.name },
  ];

  const shortDescription = product.description.slice(0, 140) + "...";

  return (
    <div className="flex flex-col gap-8 py-10 sm:py-20 px-4 sm:px-8 bg-white text-gray-800">
      {/*  Breadcrumb  */}
      <Breadcrumb items={breadcrumbItems} />

      {/*  PRODUCT SECTION  */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-[135px]">
        {/*  LEFT SIDE: Images + Icons  */}
        <div className="flex flex-row gap-4 sm:gap-6 items-start justify-center">
          {/*  Image Column  */}
          <div className="flex-1 flex flex-col items-center">
            {/* Main Image */}
            <div className="w-[280px] h-[370px] sm:w-[380px] sm:h-[500px] lg:w-[450px] lg:h-[610px]">
              <Image
                src={selectedImage}
                alt="product image"
                width={450}
                height={610}
                className="rounded-xl object-cover shadow-md transition-all duration-300 w-full h-full"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-10 h-10 sm:w-20 sm:h-20 rounded-lg border-2 object-cover transition ${
                    selectedImage === img
                      ? "border-black scale-105"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>

          {/*  Icon Controls  */}
          <div className="flex flex-col justify-between items-center h-[370px] sm:h-[500px] lg:h-[610px] py-2 sm:py-4">
            {/* Top Icons */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <button
                onClick={handleDownload}
                className="p-2 bg-[#F2F2F2] rounded-full shadow hover:bg-gray-100 transition"
                title="Download image"
              >
                <Download className="w-5 h-5 text-gray-700" />
              </button>

              <button
                onClick={toggleWishlist}
                className={`p-2 rounded-full shadow transition ${
                  wishlist.includes(selectedImage)
                    ? "bg-red-100"
                    : "bg-[#F2F2F2] hover:bg-gray-100"
                }`}
                title="Add to Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.includes(selectedImage)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-700"
                  }`}
                />
              </button>
            </div>

            {/* Bottom Navigation */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <button
                onClick={handlePrev}
                className="p-2 bg-[#F2F2F2] rounded-full shadow hover:bg-gray-100 transition"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-[#F2F2F2] rounded-full shadow hover:bg-gray-100 transition"
                title="Next"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/*  RIGHT SIDE: Product Details  */}
        <div className="flex-1 flex flex-col gap-8 max-w-full lg:max-w-[520px]">
          {/* Product Info */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm sm:text-base text-[#8F8F8F]">
                John Lewis ANYDAY
              </p>
              <h1 className="text-2xl sm:text-4xl text-[#292929] font-bold">
                {product.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[#666666] line-through text-base sm:text-lg">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xl sm:text-2xl font-semibold text-[#141414]">
                  ${product.discountedPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-lg text-[#666666]">
                  {product.totalSold} sold
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-base sm:text-2xl font-semibold text-[#141414]">
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <span className="text-lg sm:text-xl font-bold text-[#292929]">
              Description:
            </span>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-2">
              {showFullDescription ? product.description : shortDescription}
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-base font-bold text-black ml-2 hover:underline"
              >
                {showFullDescription ? "See less" : "See more"}
              </button>
            </p>
          </div>

          {/* Colors */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#8F8F8F] mb-2">
              Color:{" "}
              <span className="text-[#292929]">{selectedColor.name}</span>
            </h2>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((colorObj) => (
                <button
                  key={colorObj.name}
                  onClick={() => setSelectedColor(colorObj)}
                  className={`w-10 h-8 sm:w-12 rounded-md border-2 shadow-sm transition ${
                    selectedColor.name === colorObj.name
                      ? "border-black scale-105"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: colorObj.hex }}
                  title={colorObj.name}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#8F8F8F] mb-2">
              Size:
              <span className="text-[#292929]">{selectedSize ?? 6 }</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 sm:w-12 h-8 rounded-md border text-sm font-medium transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition flex-1 min-w-[140px]"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            <button
              onClick={() => router.push("/checkout")}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-gray-400 text-gray-800 rounded-lg hover:bg-gray-100 transition flex-1 min-w-[140px]"
            >
              <CreditCard className="w-5 h-5" />
              Checkout
            </button>
          </div>

          <a href="#" className="text-sm sm:text-base text-[#7A7A7A] mt-2">
            Delivery T&C
          </a>
        </div>
      </div>
    </div>
  );
}
