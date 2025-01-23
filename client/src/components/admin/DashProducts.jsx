// DashProducts.jsx
import React, { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchProductsPageApi, deleteProductByIdApi } from "./api";

const DashProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { accessToken } = useSelector((state) => state.user);

  const fetchProducts = async () => {
    try {
      const data = await fetchProductsPageApi(currentPage, accessToken);
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / 9);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await deleteProductByIdApi(productId, accessToken);
        alert("Product deleted successfully!");
        // Refresh products after deletion
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product: " + error.message);
      }
    }
  };

  return (
    <div className="table-auto dark:bg-gray-900 overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div>
        <h2 className="text-center text-lg font-bold py-1">All Product List</h2>
      </div>
      <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Product image</Table.HeadCell>
            <Table.HeadCell>Product title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {products.map((product, index) => (
            <Table.Body className="divide-y" key={index}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  {new Date(product.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.productImage}
                      alt="pic"
                      className="w-20 h-10 object-cover bg-gray-500"
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className="font-medium text-gray-900 dark:text-white"
                    to={`/product/${product._id}`}
                  >
                    {product.name}
                  </Link>
                </Table.Cell>
                <Table.Cell>{product.category.type}</Table.Cell>
                <Table.Cell>
                  <span
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className="text-teal-500 hover:underline"
                    to={`/product/edit/${product._id}`}
                  >
                    <span>Edit</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </>
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

export default DashProducts;
