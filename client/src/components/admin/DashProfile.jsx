import React, { useState } from "react";
import avatar from "../../assets/avatar.jpeg";
import { Avatar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../redux/user/userSlice";
import { updateProfileApi, updateAvatarApi } from "../../api";

const DashProfile = () => {
  const { currentUser, error, loading, accessToken } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const data = await updateProfileApi(formData, accessToken);

      if (!data.success) {
        dispatch(updateFailure(data));
        return;
      }

      const { user, accessToken: newAccessToken } = data.data;
      dispatch(updateSuccess({ user, accessToken: newAccessToken }));
    } catch (error) {
      dispatch(updateFailure(error));
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    try {
      dispatch(updateStart());
      const data = await updateAvatarApi(file, accessToken);

      const { user } = data.data;
      dispatch(updateSuccess({ user, accessToken }));
    } catch (error) {
      console.error("Error changing profile picture:", error);
      dispatch(updateFailure(error));
    }
  };

  return (
    <div className="relative py-14 mx-auto flex flex-col text-gray-700 dark:text-gray-200 bg-transparent shadow-none rounded-xl bg-clip-border">
      <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        Profile
      </h4>
      <p className="block mt-1 pb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700 dark:text-gray-200">
        Nice to meet you!
      </p>
      <Avatar
        img={currentUser.avatar || avatar}
        bordered
        size="lg"
        onClick={() => document.getElementById("avatarInput").click()}
        style={{ cursor: "pointer" }}
      />
      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleAvatarChange}
      />
      <form
        className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6 mb-1">
          <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            Your Name
          </h6>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={currentUser.username}
            className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3"
            onChange={handleChange}
          />
          <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            Your Email
          </h6>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={currentUser.email}
            className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3"
            onChange={handleChange}
          />
        </div>
        <button
          className="mt-6 block w-full rounded-lg bg-gray-900 py-3 text-white"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <p className="text-red-700">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
};

export default DashProfile;
