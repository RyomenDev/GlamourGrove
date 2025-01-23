import React, { useEffect, useState } from "react";
import PremiumCard from "../card/PremiumCard";
import Skeleton from "../card/Skeleton";

import { getProductsByCategory } from "../../api/User";

const PremiumCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("PremiumWomen");

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true); // Set loading to true before fetching products
      try {
        const data = await getProductsByCategory(selectedCategory); // Use the API function
        setProducts(data.data); // Assuming `data.data` contains the product list
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after the request
      }
    };

    if (selectedCategory) fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col py-10 dark:bg-darkPurple">
      <div>
        <h2 className="py-10 text-center text-xl font-semibold bg-newarrival dark:text-gray-800 font-serif">
          {" "}
          Premium Women Collection{" "}
        </h2>
      </div>
      <div className="flex flex-wrap justify-evenly gap-5 mt-5">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          // Render products once data is fetched
          products.map((product) => (
            <PremiumCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default PremiumCollection;
