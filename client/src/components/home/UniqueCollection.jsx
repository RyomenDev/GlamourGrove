import React, { useEffect, useState } from "react";
import ImageCard from "../card/ImageCard";

import { fetchProductsByCategory } from "../../api/User";

const UniqueCollection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchProductsByCategory("Unique"); // Fetch products for 'Unique' category
        // console.log({productsData});
        
        setProducts(productsData.products); // Update state with fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
    <div className="bg-white font-sans p-10 dark:bg-darkPurple dark:text-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold inline-block font-serif">
            Discover Timeless Elegance
          </h2>
          <p className="text-sm mt-6 dark:text-gray-200 font-serif">
            Explore our exclusive collection, where sophistication meets style.
            From classic designs to modern trends, find pieces that redefine
            elegance.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-md:max-w-lg mx-auto">
          {products?.map((product) => (
            <ImageCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default UniqueCollection;
