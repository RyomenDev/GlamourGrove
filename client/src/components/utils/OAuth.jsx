import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { signInSuccess } from "../../redux/user/userSlice";
import { googleOAuthApi } from "../../api/User";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      // Extract user details
      const userDetails = {
        fullName: result.user.displayName,
        username: result.user.displayName,
        email: result.user.email,
      };

      // Make API call using the utility
      const { user, accessToken } = await googleOAuthApi(userDetails);

      // Dispatch the login action and navigate
      dispatch(signInSuccess({ user, accessToken }));
      navigate("/");
    } catch (error) {
      console.log("Could not login with Google:", error);
    }
  };

  return (
    <button type="button" onClick={handleGoogleClick}>
      Sign in with Google
    </button>
  );
}
