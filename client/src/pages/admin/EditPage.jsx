import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails, updateProductDetails } from "../../Admin";

const EditPage = () => {
  const { productId } = useParams();
  const { accessToken } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    productImage: null,
    price: "",
    stock: "",
    categoryName: "",
    categoryType: "",
    color: "",
    size: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductDetails(productId);
        const {
          name,
          description,
          price,
          stock,
          category,
          productImage,
          color,
          size,
        } = data.data;

        setProductData({
          name,
          description,
          price,
          stock,
          productImage,
          categoryName: category.name,
          categoryType: category.type,
          color: Array.isArray(color) ? color.join(", ") : color,
          size: Array.isArray(size) ? size.join(", ") : size,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({
        ...productData,
        productImage: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = await updateProductDetails(
        productId,
        productData,
        accessToken
      );
      setLoading(false);
      alert("Product updated successfully!");
      setProductData({
        ...updatedData.data,
        categoryName: updatedData.data.category.name,
        categoryType: updatedData.data.category.type,
        color: Array.isArray(updatedData.data.color)
          ? updatedData.data.color.join(", ")
          : updatedData.data.color,
        size: Array.isArray(updatedData.data.size)
          ? updatedData.data.size.join(", ")
          : updatedData.data.size,
      });
    } catch (error) {
      setLoading(false);
      console.error("Error updating product:", error.message);
      alert("Failed to update product: " + error.message);
    }
  };

  return (
    <div className="py-32 flex flex-col justify-center items-center dark:text-gray-50 dark:bg-gray-900">
      <h1 className="text-xl font-semibold">Edit Product</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 dark:text-black"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="input input-bordered input-accent w-80 md:w-96"
          value={productData.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="textarea textarea-accent"
          placeholder="Product Description"
          onChange={handleChange}
          value={productData.description}
        ></textarea>
        {productData.productImage && (
          <img
            src={productData.productImage}
            alt="Product Preview"
            className="w-20 h-20 rounded-full cursor-pointer"
          />
        )}
        <input
          type="file"
          name="productImage"
          accept="image/*"
          className="file-input file-input-bordered w-80 md:w-96"
          onChange={handleImageChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          className="input input-bordered input-accent w-80 md:w-96"
          onChange={handleChange}
          value={productData.price}
        />
        <input
          type="number"
          name="stock"
          placeholder="Product Stock"
          className="input input-bordered input-accent w-80 md:w-96"
          onChange={handleChange}
          value={productData.stock}
        />
        <input
          type="text"
          name="categoryName"
          placeholder="Product Category Name"
          className="input input-bordered input-accent w-80 md:w-96"
          onChange={handleChange}
          value={productData.categoryName}
        />
        <input
          type="text"
          name="categoryType"
          placeholder="Product Category Type"
          className="input input-bordered input-accent w-80 md:w-96"
          onChange={handleChange}
          value={productData.categoryType}
        />
        <input
          type="text"
          name="color"
          placeholder="Product Color"
          className="input input-bordered input-accent w-80 md:w-96"
          onChange={handleChange}
          value={productData.color}
        />
        <input
          type="text"
          name="size"
          id="size"
          placeholder="Product Size"
          className="input input-bordered input-accent w-80 md:w-96"
          onChange={handleChange}
          value={productData.size}
        />
        <button type="submit" className="btn btn-neutral">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EditPage;
