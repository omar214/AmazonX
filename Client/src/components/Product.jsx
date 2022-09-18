import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Review from './Review.jsx';
import { Link } from 'react-router-dom';

const Product = ({ p }) => {
	const handleAddToCart = (e) => {
		// TODO
	};

	return (
		// <Link to={`/products/${p.slug}`}>
		<Card>
			<Link to={`/products/${p.slug}`}>
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
					<Button variant="primary" onClick={handleAddToCart}>
						Add To Cart
					</Button>
				) : (
					<Card.Text className=" text-muted"> out of stock </Card.Text>
				)}
			</Card.Body>
		</Card>
		// </Link>
	);
};

export default Product;
