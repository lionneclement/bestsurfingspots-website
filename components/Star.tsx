import {StarIcon as StartIconOutline} from '@heroicons/react/outline';
import {StarIcon as StartIconSolid} from '@heroicons/react/solid';

export const StarRating = ({value = 0}: {value: number}) => (
  <div className="flex">
    {Array.from({length: 5}, (_, i) => i + 1).map((index) =>
      index <= value ? (
        <StartIconSolid key={index} className="h-5 w-5 text-primary" />
      ) : (
        <StartIconOutline key={index} className="h-5 w-5 text-primary" />
      )
    )}
  </div>
);
