import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps.jsx';
import { useDispatch, useSelector } from 'react-redux';
import API from '../api/api.js';
import { clearCart } from '../redux/cartSlice.js';

const PlaceOrder = () => {
	const [orderDetails, setOrderDetails] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		const itemsPrice = cartItems.reduce(
			(acc, item) => acc + item.product.price * item.quantity,
			0,
		);
		const shipping = 0.05 * itemsPrice;
		const tax = Math.floor(0.14 * itemsPrice);
		const totalPrice = shipping + tax + itemsPrice;

		setOrderDetails({
			itemsPrice,
			shipping,
			tax,
			totalPrice,
		});
	}, []);

	const { currentUser } = useSelector((state) => state.user);
	const {
		address,
		paymentMethod,
		cart: { items: cartItems },
	} = useSelector((state) => state.cart);

	const handleCheckout = async (e) => {
		try {
			const sentAddress =
				address.country + ' , ' + address.city + ', ' + address.address;
			const { data: res } = await API.post('/cart/checkout', {
				address: sentAddress,
				paymentMethod,
			});
			console.log(res);
			dispatch(clearCart());
			navigate(`/orders/${res.order._id}`);
		} catch (error) {
			// dispatch(loginFailure('Invalid email or password'));
			console.log(error);
		}
	};
	return (
		<Container className="pb-4">
			{!currentUser ? (
				<Alert variant="info">
					You Are not logged in <Link> Sign In</Link> To see your orders
				</Alert>
			) : (
				<>
					<CheckoutSteps step1 step2 step3 step4 />
					<h2 className="mb-4">Preview Order</h2>
					<Row>
						<Col sm={12} lg={8}>
							<Card className="mb-3">
								<Card.Header>Shipping</Card.Header>
								<Card.Body>
									<p>
										<strong>Name :</strong> {currentUser.name}
									</p>
									<p>
										<strong className="me-2">Address :</strong>
										{address.country +
											' , ' +
											address.city +
											', ' +
											address.address}
									</p>
									<Card.Link
										as={Link}
										to="/shipping"
										// className="text-info"
									>
										Edit
									</Card.Link>
								</Card.Body>
							</Card>

							<Card className="mb-3">
								<Card.Header>Payment</Card.Header>
								<Card.Body>
									<p>
										<strong>Method :</strong> {paymentMethod}
									</p>
									<Card.Link
										as={Link}
										to="/payment"
										// className="text-info"
									>
										Edit
									</Card.Link>
								</Card.Body>
							</Card>

							<Card className="mb-5">
								<Card.Header>Items</Card.Header>
								<Card.Body>
									<ListGroup variant="flush">
										{cartItems.map((p) => (
											<ListGroup.Item>
												<Row className="align-items-center text-center text-md-left">
													<Col md={4} className="me-1 ">
														<Image
															src={p.product.image}
															className="img-thumbnail me-2"
															rounded
															width={'70px'}
														/>
														<Link
															to={`/products/${p.product._id}`}
															// className="text-info"
														>
															{p.product.name}
														</Link>
													</Col>

													<Col className="me-1 ">
														<strong>{p.quantity}</strong>
													</Col>

													<Col className="">
														<strong> $ {p.product.price}</strong>
													</Col>
												</Row>
											</ListGroup.Item>
										))}
									</ListGroup>

									<Card.Link
										as={Link}
										to="/cart"
										// className="text-info"
									>
										Edit
									</Card.Link>
								</Card.Body>
							</Card>
						</Col>

						<Col sm={12} lg={4} className="mt-2 mt-md-0">
							<Card>
								<Card.Header>Order Summary</Card.Header>
								<Card.Body>
									<ListGroup variant="flush">
										<ListGroup.Item className="mb-2">
											<Row>
												<Col>items</Col>
												<Col className="ms-auto">
													<strong>${orderDetails.itemsPrice}</strong>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item className="mb-2">
											<Row>
												<Col>shipping</Col>
												<Col className="ms-auto ">
													<strong>${orderDetails.shipping}</strong>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item className="mb-2">
											<Row>
												<Col>Tax</Col>
												<Col className="ms-auto">
													<strong>${orderDetails.tax}</strong>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item className="mb-2">
											<Row>
												<Col>Order Total</Col>
												<Col className="ms-auto">
													<strong>{orderDetails.totalPrice}</strong>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Button size="lg" onClick={handleCheckout}>
												Place Order
											</Button>
										</ListGroup.Item>
									</ListGroup>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default PlaceOrder;
