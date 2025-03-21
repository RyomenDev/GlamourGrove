import { useEffect, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { registerCall } from "../api/retellAi.jsx";
import { FaPhoneAlt } from "react-icons/fa";
import conf from "../conf/retellAi-conf.jsx";
import { useSelector } from "react-redux";

import activeBot from "../assets/activeBot.png";
import inActiveBot from "../assets/inActiveBot.png";

const RETELL_AI_AGENT_ID = conf.RETELL_AI_AGENT_ID;
const retellWebClient = new RetellWebClient();

const RetellAi = () => {
  const [isCalling, setIsCalling] = useState(false);
  const { accessToken } = useSelector((state) => state.user);
  const token = accessToken || localStorage.getItem("access_token");

  // Initialize the SDK
  useEffect(() => {
    retellWebClient.on("call_started", () => {
      console.log("call started");
      // OTHER EFFECTS
    });

    retellWebClient.on("call_ended", () => {
      console.log("call ended");
      // OTHER EFFECTS
      setIsCalling(false);
    });

    retellWebClient.on("agent_start_talking", () => {
      //   console.log("agent_start_talking");
      // OTHER EFFETCS
    });

    retellWebClient.on("agent_stop_talking", () => {
      //   console.log("agent_stop_talking");
      // OTHER EFFETCS
    });

    retellWebClient.on("audio", (audio) => {
      console.log("audio", audio);
    });

    // message from agent and caller
    retellWebClient.on("update", (update) => {
      //   console.log(update);
      //   console.log(
      //     // "update",
      //     update.transcript[0].role,
      //     ":",
      //     update.transcript[0].content
      //   );
    });

    retellWebClient.on("metadata", (metadata) => {
      console.log("metadata", metadata);
    });

    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      // Handle errors with custom handler
      handleApiError(error, navigate);
      // Stop call in case of error
      retellWebClient.stopCall();
    });
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      // Stop the call if it is active
      retellWebClient.stopCall();
      setIsCalling(false);
    } else {
      try {
        console.log("calling");
        if (!RETELL_AI_AGENT_ID) {
          throw new Error("RETELL_AI_AGENT_ID is missing or undefined");
        }
        // Register the call and get the access token
        const registerCallResponse = await registerCall(
          RETELL_AI_AGENT_ID,
          token
        );

        if (registerCallResponse.access_token) {
          // Start the call with the access token
          await retellWebClient
            .startCall({
              accessToken: registerCallResponse.access_token,
            })
            .catch((error) => {
              // Handle errors related to starting the call
              //   console.error("Error adding product:", error.message);
              alert("Failed to Connect: " + error.message);
            });

          setIsCalling(true);
        }
      } catch (error) {
        // Handle API errors during call registration
        // console.error("Error adding product:", error.message);
        alert("Failed to Connect: " + error.message);
      }
    }
  };

  return (
    <>
      {/* Button styled to be positioned at the bottom-right */}
      <div className="absolute bottom-4 right-8">
        <button
          onClick={toggleConversation}
          className={`py-2 px-4 flex items-center justify-center gap-3 rounded-lg text-white font-semibold transition-all duration-300 transform shadow-lg hover:scale-105 ${
            isCalling
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } sm:py-1 sm:px-1 md:py-2 md:px-3 lg:py-4 lg:px-5`}
        >
          {/* Icon */}
          <FaPhoneAlt className="text-base sm:text-lg md:text-xl lg:text-2xl" />

          {/* Image Indicator */}
          <span
            className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-200 rounded-full overflow-hidden"
            title={isCalling ? "Active Bot" : "Inactive Bot"}
          >
            <img
              src={isCalling ? activeBot : inActiveBot}
              alt={isCalling ? "Active Bot" : "Inactive Bot"}
              className="w-full h-full object-cover"
            />
          </span>
        </button>
      </div>
    </>
  );
};

export default RetellAi;
