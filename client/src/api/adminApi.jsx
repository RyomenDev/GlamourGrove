import conf from "../conf/conf";
const baseUrl = conf.SERVER_API_URL;

export const addProduct = async (formData, accessToken) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("description", formData.description);
  data.append("price", formData.price);
  data.append("stock", formData.stock);
  data.append("category[name]", formData.categoryName);
  data.append("category[type]", formData.categoryType);

  const colorArray = formData.color.split(",").map((c) => c.trim());
  const sizeArray = formData.size.split(",").map((s) => c.trim());

  data.append("color", JSON.stringify(colorArray));
  data.append("size", JSON.stringify(sizeArray));
  data.append("productImage", formData.productImage);

  try {
    const response = await fetch(`${baseUrl}/api/product/addProduct`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to add product");
    }

    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
};
