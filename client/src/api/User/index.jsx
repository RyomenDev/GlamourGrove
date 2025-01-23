import {
  addComment,
  getComments,
  likeComment,
  editComment,
  deleteComment,
} from "./CommentApi";
import { logoutUser } from "./HeaderApi.jsx";
import {
  getProductsByCategory,
  fetchProductsByCategory,
  fetchProducts,
  fetchAllProductsByPage,
} from "./HomeApi";
import { googleOAuthApi } from "./UtilsApi";

export {
  addComment,
  getComments,
  likeComment,
  editComment,
  //
  deleteComment,
  //
  getProductsByCategory,
  fetchProductsByCategory,
  fetchProducts,
  fetchAllProductsByPage,
  //
  googleOAuthApi,
};
