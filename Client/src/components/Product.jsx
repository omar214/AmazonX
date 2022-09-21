import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Review from './Review.jsx';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api.js';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems } from '../redux/cartSlice.js';
import { useState } from 'react';

const Product = ({ p }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);

	const [buttonState, setButtonState] = useState({
		loading: false,
		error: '',
	});

	const handleAddToCart = (e) => {
		!currentUser && navigate('/login');
		const addToCartRequest = async () => {
			setButtonState((prev) => ({ ...prev, loading: true }));
			try {
				const item = { quantity: 1, product: p._id };
				const { data: res } = await API.post('/cart', {
					items: [item],
				});
				dispatch(setCartItems(res.cart));
				setButtonState((prev) => ({ ...prev, loading: false }));
				console.log(res.cart);
			} catch (error) {
				setButtonState({ error: error.message, loading: false });
				console.log(error);
			}
		};
		currentUser && addToCartRequest();
	};

	return (
		<Card>
			<Link to={`/products/${p._id}`}>
				<Card.Img variant="top" src={p.image} />
			</Link>

			<Card.Body>
				<Card.Title>{p.name} </Card.Title>
				<Card.Text>{p.description}</Card.Text>
				<Review rating={p.rating} numReviews={p.numReviews} />
				<Card.Text>
					<strong> ${p.price} </strong>
				</Card.Text>

				{p.countInStock > 0 ? (
					<>
						<Button variant="primary" onClick={handleAddToCart}>
							Add To Cart
						</Button>
						{buttonState.loading ? (
							<Alert variant="success" className="mt-2">
								adding to Cart...
							</Alert>
						) : (
							buttonState.error && (
								<Alert variant="danger" className="mt-2">
									error adding to Cart
								</Alert>
							)
						)}
					</>
				) : (
					<Button variant="light" disabled className="text-muted">
						out of stock
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};

export default Product;
