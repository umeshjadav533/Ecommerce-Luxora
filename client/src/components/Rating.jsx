import { Star } from "lucide-react";

const Rating = ({ rating = 0, reviews = [] }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className={`flex items-center gap-1 justify-center rounded-sm p-[2px] transparent`}>
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="fill-black"
          size={20}
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className="text-black" size={20} />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="fill-black" size={20} />
          </div>
        </div>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="fill-black" size={20} />
      ))}

      {rating && (
        <span className="ml-1 text-lg">
          {rating.toFixed(1)}
          {reviews.length > 0 && ` (${reviews.length})`}
        </span>
      )}
    </div>
  );
};

export default Rating;