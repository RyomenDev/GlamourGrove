import { addProduct } from "./Admin/AddProductsApi";
import {
  fetchUsers,
  fetchProducts,
  fetchCountProducts,
} from "./Admin/BoardCompApi";
import {
  fetchCommentsPageApi,
  deleteCommentByIdApi,
} from "./Admin/CommentsApi";
import {
  fetchProductsPageApi,
  deleteProductByIdApi,
} from "./Admin/ProductsApi";

export {
  addProduct,
  //
  fetchUsers,
  fetchProducts,
  fetchCountProducts,
  fetchComments,
  //
  fetchCommentsPageApi,
  deleteCommentByIdApi,
  //
  fetchProductsPageApi,
  deleteProductByIdApi,
};
