import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Heart, Loader } from "lucide-react";

const LikeButton = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonState, setButtonState] = useState("Default");

  const fetchStatus = async (action) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }
      );
      if (!response.ok) {
        setError(
          response.statusText || "Something went wrong. Please try again."
        );
        setIsLoading(false);
        return;
      }
      const result = await response.json();

      if (action === "like" && result.message === "Success!") {
        setButtonState("Liked");
      } else if (action === "unlike" && result.message === "Success!") {
        setButtonState("Unliked");
      }
    } catch (error) {
      console.log(error);
      setButtonState("Default");
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    setError(null);

    if (buttonState === "Liked") {
      await fetchStatus("unlike");
      return;
    }
    await fetchStatus("like");
  };

  return (
    <div className="flex flex-col gap-2 items-center h-[80px] justify-between">
      <button
        className="inline-flex gap-1 items-center justify-center px-4 py-2 rounded-md bg-gray-200 text-gray-600 text-lg w-[58px] outline outline-2 outline-black/15"
        onClick={handleClick}
      >
        {isLoading ? (
          <Loader className="text-gray-600 animate-spin size-5" />
        ) : buttonState === "Liked" ? (
          <FaHeart className="text-red-500 size-5" />
        ) : (
          <Heart className="text-gray-400 size-5" />
        )}
      </button>

      {error && (
        <p className="text-gray-600 font-medium text-sm max-w-sm">{error}</p>
      )}
    </div>
  );
};

export default LikeButton;
