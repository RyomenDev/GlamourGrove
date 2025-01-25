import { addProduct } from "./AddProductsApi";
import {
  fetchUsersApi,
  fetchProductsApi,
  fetchProductCountsApi,
  fetchCommentsApi,
} from "./BoardCompApi";
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
  fetchUsersApi,
  fetchProductsApi,
  fetchProductCountsApi,
  fetchCommentsApi,
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
  fetchOrders,
  //
  fetchUsersByPage,
  deleteUserByUserId,
  //
  fetchProductDetails,
  updateOrderStatus,
  //
  updateProductDetails,
};
