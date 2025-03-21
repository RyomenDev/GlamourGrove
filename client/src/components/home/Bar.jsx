import React, { useEffect, useState } from "react";
import MenCard from "../card/MenCard";
import WomenCard from "../card/WomenCard";
import KidsCard from "../card/KidsCard";
import PriceCard from "../card/PriceCard";
import Skeleton from "../card/Skeleton";
import { Link } from "react-router-dom";

import { fetchProductsByCategory } from "../../api/User";

const Bar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Show loader while fetching products
      try {
        const data = await fetchProductsByCategory(selectedCategory); // Use the API function
        setProducts(data.products); // Update state with fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Hide loader after fetching
      }
    };

    getProducts();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full py-10 dark:bg-gray-900">
      <div className="flex justify-between bg-gray-100 dark:bg-gray-700 py-4 px-2 dark:text-gray-50 text-gray-800">
        <a className="btn btn-ghost text-lg">SHOP NOW</a>
        <Link className="btn btn-ghost text-lg " to="/search">
          All
        </Link>
        <a
          className="btn btn-ghost text-lg "
          onClick={() => handleCategoryClick("Men")}
        >
          MEN
        </a>
        <a
          className="btn btn-ghost text-lg "
          onClick={() => handleCategoryClick("Women")}
        >
          WOMEN
        </a>
        <a
          className="btn btn-ghost text-lg "
          onClick={() => handleCategoryClick("Kids")}
        >
          KIDS
        </a>
      </div>
      {loading ? ( // Render skeleton or loading indicator while loading is true
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-20 ml-3 justify-center items-center md:justify-between">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 ml-3 justify-center items-center md:justify-between">
          {/* Map over the products and render PriceCard for each product */}
          {products.map((product, index) => (
            <PriceCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bar;
