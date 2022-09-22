import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Review from '../components/Review.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../api/api.js';

const Reviews = ({ productId }) => {
	const { currentUser } = useSelector((state) => state.user);
	const [reviews, setReviews] = useState([]);
	const [errorMessage, setErrorMessage] = useState([]);
	const formRef = useRef(null);

	const handleSubmitReview = async (e) => {
		e.preventDefault();
		let ratingOption = formRef.current.ratingOption.value,
			comment = formRef.current.comment.value.trim();

		let err = [];
		setErrorMessage([]);

		if (!comment) err.push('please enter valid comment');
		if (ratingOption === '0') err.push('please choose valid rating');
		if (err.length !== 0) {
			setErrorMessage(err);
			console.log(err);
			return;
		}

		try {
			const { data: res } = await API.post(`/reviews/${productId}`, {
				comment,
				rating: ratingOption,
				name: currentUser.name,
			});
			setReviews((prev) => [...prev, res.review]);
			formRef.current.reset();
			console.log(res.review);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		const fecthProduct = async () => {
			try {
				const { data: res } = await API.get(`/reviews/${productId}`);
				setReviews(res.reviews);
			} catch (error) {
				console.log(error.message);
			}
		};
		fecthProduct();
	}, [productId]);

	return (
		<>
			<h2 className="mb-4"> Reviews </h2>
			<ListGroup className="mb-3">
				{reviews &&
					reviews.map((r, idx) => (
						<ListGroup.Item key={idx}>
							<strong className="d-block">{r.name}</strong>
							<Review rating={r.rating} numReviews={-1} />
							<p>2022-06-22</p>
							<p>{r.comment}</p>
						</ListGroup.Item>
					))}
			</ListGroup>

			{/* Write Review */}
			{currentUser ? (
				<>
					<h2> Write Customer Review </h2>
					<Form onSubmit={handleSubmitReview} ref={formRef}>
						<Form.Select
							aria-label="Default select example"
							name="ratingOption"
						>
							<option value={0}>Open this select menu</option>
							<option value={1}>1- Poor</option>
							<option value={2}>2- Fair</option>
							<option value={3}>3- Good</option>
							<option value={4}>4- Very Good</option>
							<option value={5}>5- Excellent</option>
						</Form.Select>
						{errorMessage.includes('please choose valid rating') && (
							<Alert variant="danger" className="mt-2">
								please enter valid comment
							</Alert>
						)}

						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Review </Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Write Your Review"
								name="comment"
							/>
						</Form.Group>

						{errorMessage.includes('please enter valid comment') && (
							<Alert variant="danger" className="mt-2">
								please enter valid comment
							</Alert>
						)}

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</>
			) : (
				<Alert variant="info">
					Please <Link> Sign In</Link> to write a review
				</Alert>
			)}
		</>
	);
};

export default Reviews;
