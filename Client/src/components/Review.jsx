import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect, useState } from 'react';

const Review = ({ rating, numReviews }) => {
	return (
		<>
			{[1, 2, 3, 4, 5].map((idx) => (
				<span className="text-primary">
					{rating === idx - 0.5 ? (
						<StarHalfIcon key={6} fontSize="small" />
					) : rating >= idx ? (
						<StarIcon fontSize="small" />
					) : (
						<StarBorderIcon fontSize="small" />
					)}
				</span>
			))}
			{numReviews !== -1 && (
				<p className="text-primary">{numReviews ?? 0} Reviews</p>
			)}
		</>
	);
};

export default Review;
