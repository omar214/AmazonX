import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Review from '../components/Review.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../api/api.js';
import { setCartItems } from '../redux/cartSlice.js';
import Reviews from '../components/Reviews.jsx';

const Product = () => {
	const params = useParams();
	const { id: productId } = params;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { currentUser } = useSelector((state) => state.user);
	const [proudct, setProudct] = useState({});

	useEffect(() => {
		const fecthProduct = async () => {
			try {
				const { data: res } = await API.get(`/products/${productId}`);
				setProudct(res.product);
			} catch (error) {
				console.log(error.message);
			}
		};
		fecthProduct();
	}, [productId]);

	const handleAddToCart = (e) => {
		!currentUser && navigate('/login');
		const addToCartRequest = async () => {
			try {
				const item = { quantity: 1, product: productId };
				const { data: res } = await API.post('/cart', {
					items: [item],
				});
				dispatch(setCartItems(res.cart));
				console.log(res.cart);
			} catch (error) {
				console.log(error);
			}
		};
		currentUser && addToCartRequest();
	};
	return (
		<Container className="pb-4">
			{/* Product Details */}
			<Row className="mb-4">
				<Col md={6} className="mb-5 mb-md-0">
					<Image src={proudct.image} className="img-thumbnail" />
				</Col>
				<Col md={3} className="">
					<h2> {proudct.name} </h2>
					<hr />
					<Review rating={proudct.rating} numReviews={proudct.numReviews} />
					<hr />
					<p>
						<strong>${proudct.price}</strong>
					</p>
					<hr />
					<Image
						src={proudct.image}
						className="img-thumbnail d-none d-lg-inline"
						width={'150px'}
					/>
					<hr className="d-none d-lg-block" />
					Description :<p>{proudct.description}</p>
				</Col>
				<Col md={3}>
					<ListGroup>
						<ListGroup.Item className="p-4">
							<Row>
								<Col> Price :</Col>
								<Col className="ms-auto">
									<strong> ${proudct.price} </strong>
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item className="p-4">
							<Row>
								<Col> Status :</Col>
								<Col className="ms-auto">
									{proudct.countInStock > 0 ? (
										<Badge bg="success">in Stock</Badge>
									) : (
										<Badge bg="danger">out of stock</Badge>
									)}
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item className="p-4 d-flex justify-content-center">
							{proudct.countInStock > 0 ? (
								<Button size="lg" onClick={handleAddToCart}>
									Add To Cart
								</Button>
							) : (
								<Button variant="light" disabled className="text-muted">
									out of stock
								</Button>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>

			{/* Reviews */}
			<Reviews productId={productId} />
		</Container>
	);
};

export default Product;
