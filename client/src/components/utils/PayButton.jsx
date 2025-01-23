import React from "react";
import { useSelector } from "react-redux";
import { createCheckoutSession } from "../../api/User";

const PayButton = ({ cartItems }) => {
  const { _id } = useSelector((state) => state.user.currentUser);

  const handleCheckout = async () => {
    try {
      const payload = { cartItems, userId: _id };
      const data = await createCheckoutSession(payload);

      if (data.url) {
        console.log(data.url);
        window.location.href = data.url; // Redirect to the Stripe checkout page
      }
    } catch (err) {
      console.error("Error during checkout:", err.message);
    }
  };

  return (
    <div>
      <button
        className="bg-[#333] text-white w-full py-3 mt-6 font-semibold text-center rounded-md"
        onClick={handleCheckout}
      >
        Proceed to checkout
      </button>
    </div>
  );
};

export default PayButton;
