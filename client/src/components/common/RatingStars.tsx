import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewsCount?: number;
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  max = 5,
  size = 'md',
  showNumber = true,
  reviewsCount,
  interactive = false,
  onRatingChange,
}) => {
  const iconSize = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const half = !filled && index < rating;

          return (
            <button
              type="button"
              key={index}
              disabled={!interactive}
              onClick={() => interactive && onRatingChange && onRatingChange(index + 1)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
            >
              <Star
                className={`${iconSize} ${
                  filled
                    ? 'fill-amber-400 text-amber-400'
                    : half
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'text-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showNumber && (
        <span className="font-semibold text-slate-800 text-xs sm:text-sm">
          {rating.toFixed(1)}
        </span>
      )}

      {reviewsCount !== undefined && (
        <span className="text-slate-500 text-xs">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};
