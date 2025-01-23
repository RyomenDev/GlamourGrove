import { addProduct } from "./AddProductsApi";
import { fetchUsers, fetchProducts, fetchCountProducts } from "./BoardCompApi";
import { fetchCommentsPageApi, deleteCommentByIdApi } from "./CommentsApi";
import { fetchProductsPageApi, deleteProductByIdApi } from "./ProductsApi";
import { updateProfileApi, updateAvatarApi } from "./ProfileApi";
import { signOutApi } from "./SidebarApi";
import { fetchOrders } from "./TransactionApi";
import { fetchUsersByPage, deleteUserByUserId } from "./UsersApi";
import { fetchProductDetails, updateOrderStatus } from "./OrderCardApi";
import { updateProductDetails } from "./PagesApi"; //fetchProductDetails,

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
  fetchUsersByPage,
  deleteUserByUserId,
  //
  fetchProductDetails,
  updateOrderStatus,
  //
  updateProductDetails,
};
