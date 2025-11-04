
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProductId from "../components/ProductId";
import RelatedProducts from "../components/RelatedProduct";
import ProductReview from "../components/ProductReview";
import PopularProduct from "../components/PopularProduct";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  bg-white font-sans ">
      <Header />
      <div className="flex flex-col px-5 sm:px-20 py-5">
        <Navbar />
        <div className="border-b border-gray-300 border-dashed mt-10" />
        <ProductId />
        <div className="border-b border-gray-300 border-dashed mt-10" />
        <RelatedProducts />
        <div className="border-b border-gray-300 border-dashed mt-10" />
        <ProductReview />
        <div className="border-b border-gray-300 border-dashed mt-10" />
        <PopularProduct />
      </div>
      <Footer  />
    </div>
  );
}
