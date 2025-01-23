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

export const fetchUsers = async (accessToken, perPage = 5) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/users/getUsers?perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchProducts = async (accessToken, perPage = 5) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/product/getAllProducts?perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchCountProducts = async (accessToken) => {
  try {
    const res = await fetch(`${baseUrl}/api/product/countProduct`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error("Error fetching product counts:", error);
    throw error;
  }
};

export const fetchComments = async (accessToken) => {
  try {
    const res = await fetch(`${baseUrl}/api/comment/getAllComment`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
