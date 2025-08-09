import React from 'react'
import { FaStar } from 'react-icons/fa';

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            size={14}
            className={
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
      <span className="text-gray-500 text-sm">({reviews})</span>
    </div>
  );
}

export default StarRating;