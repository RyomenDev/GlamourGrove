import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/utils/MainLayout";
import Skeleton from "../components/card/Skeleton";
import PremiumCard from "../components/card/PremiumCard";

import { fetchProductsByCategory } from "../api/Pages/PagesApi";

const WomenProductPage = () => {
  const { productName } = useParams();
  const categoryName = productName;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProductsByCategory(categoryName, currentPage);
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getProducts();
  }, [categoryName, currentPage]);

  const totalPages = Math.ceil(totalProducts / 9);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-20 flex flex-col justify-center items-center">
      <h1 className="text-center text-xl font-semibold py-8">{categoryName}</h1>
      {loading ? ( // Render skeleton if loading is true
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        // Render product details or content when loading is false
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {products.map((product) => (
            <PremiumCard key={product._id} product={product} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`mx-1 px-4 py-2 bg-blue-500 text-white rounded ${
                currentPage === page ? "bg-blue-600" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default WomenProductPage;
