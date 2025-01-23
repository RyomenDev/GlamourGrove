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
import { updateProfileApi, updateAvatarApi } from "./Admin/ProfileApi";
import { signOutApi } from "./Admin/SidebarApi";

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
  //
  updateProfileApi,
  updateAvatarApi,
  //
  signOutApi,
  //
};
