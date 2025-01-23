import React, { useEffect, useState } from "react";
import NewProductCard from "../card/NewProductCard";
import Skeleton from "../card/Skeleton";

import { fetchAllProductsByPage } from "../../api/User";

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Start loading
      try {
        const productsData = await fetchAllProductsByPage(1); // Fetch page 1 products
        setProducts(productsData); // Update state with fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    getProducts();
  }, []);

  return (
    <div className="py-10 dark:bg-darkPurple">
      <h1 className="text-center font-semibold text-lg bg-newarrival py-8 dark:text-gray-800 font-serif">
        NEW ARRIVAL
      </h1>
      <div className="font-[sans-serif] bg-gray-100 dark:bg-darkPurple mt-5">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              // Render products once data is fetched
              products.map((product) => (
                <NewProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
