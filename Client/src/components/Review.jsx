import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const Review = ({ rating, numReviews }) => {
	const stars = [];
	for (let i = 1; i <= rating; i++) {
		stars.push(<StarIcon key={i} fontSize="small" />);
	}
	if (rating !== Math.floor(rating)) {
		stars.push(<StarHalfIcon key={Math.floor(rating)} fontSize="small" />);
	}

	return (
		<>
			<span className="text-primary">{stars}</span>
			{numReviews !== -1 && (
				<p className="text-primary">{numReviews ?? 0} Reviews</p>
			)}
		</>
	);
};

export default Review;
