import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf.jsx";

const baseUrl = conf.SERVER_API_URL;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/reset-password/${token}`,
        { password }
      );
      console.log("Response:", response);

      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* <div className="max-w-md mx-auto p-8">
        <h2 className="text-2xl font-bold">Reset Password</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="password"
            placeholder="Enter new password"
            className="border rounded p-2 w-full mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="border rounded p-2 w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 mt-4 w-full rounded"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div> */}
      <div className="flex items-center justify-center h-[70vh] bg-gray-100">
        <div className="bg-white rounded-lg p-8 shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              className="border rounded p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="border rounded p-2 w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 w-full rounded hover:bg-green-600 transition"
            >
              Reset Password
            </button>
          </form>
          {message && (
            <p className="text-red-500 mt-4 text-center">{message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
