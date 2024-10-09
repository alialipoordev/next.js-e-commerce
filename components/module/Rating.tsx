import React from "react";
import StarIcon from "../ui/StarIcon";

interface RatingProps {
  rating: number;
}

function Rating({ rating }: RatingProps) {
  const data = Array(5).fill("");
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.1;

  return (
    <div className="flex items-center space-x-0.5">
      {data.map((_, index) => {
        return index + 1 <= fullStars ? (
          <StarIcon.Full key={index} />
        ) : halfStar && index === fullStars ? (
          <StarIcon.Half key={index} />
        ) : (
          <StarIcon.Empty key={index} />
        );
      })}
      <span className="font-semibold text-xs">{rating}</span>
    </div>
  );
}

export default Rating;
