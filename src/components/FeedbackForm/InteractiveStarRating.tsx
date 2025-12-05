import React, { useState } from "react";

interface InteractiveRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

const InteractiveStarRating: React.FC<InteractiveRatingProps> = ({
  value,
  onChange,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center space-x-2">

      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
          const isActive = hovered ? hovered >= star : value >= star;

          return (
            <svg
              key={star}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onChange(star)}
              className={`w-7 h-7 cursor-pointer transition-colors ${
                isActive ? "text-yellow-500" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.288 3.974a1 1 0 00.95.69h4.177c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.782.57-1.837-.197-1.538-1.118l1.288-3.974a1 1 0 00-.364-1.118L2.243 9.401c-.783-.57-.38-1.81.588-1.81h4.177a1 1 0 00.95-.69l1.288-3.974z" />
            </svg>
          );
        })}
      </div>

    </div>
  );
};

export default InteractiveStarRating;
