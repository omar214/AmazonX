import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../api/api.js';
import moment from 'moment';
import PaypalCheckoutButton from '../components/PaypalCheckoutButton.jsx';
import { toast } from 'react-toastify';

const Order = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { id: orderId } = params;
	const { currentUser } = useSelector((state) => state.user);
	const [orderDetails, setOrderDetails] = useState({});

	useEffect(() => {
		const fecthData = async () => {
			try {
				const { data: res } = await API.get(`/orders/${orderId}`);
				setOrderDetails(res.order);

				const itemsPrice = res.order.items.reduce(
					(acc, item) => acc + item.product.price * item.quantity,
					0,
				);
				const shipping = 0.05 * itemsPrice;
				const tax = Math.floor(0.14 * itemsPrice);
				const totalPrice = shipping + tax + itemsPrice;

				setOrderDetails((prev) => ({
					...prev,
					itemsPrice,
					shipping,
					tax,
					totalPrice,
				}));
				// console.log(res.order);
			} catch (error) {
				toast.dismiss();
				toast.error('Error While Fetchig order');
				console.log(error.message);
			}
		};
		currentUser && fecthData();
	}, [orderId, currentUser]);

	const handleDeliver = async (e) => {
		try {
			const { data: res } = await API.put(`/orders/${orderId}`, {
				isDelivered: true,
				DeliveredAt: Date.now(),
			});

			setOrderDetails((prev) => ({
				...prev,
				isDelivered: true,
				DeliveredAt: res.order.DeliveredAt,
			}));
		} catch (error) {
			toast.dismiss();
			toast.error('Error Deleivering Order');
			console.log(error.message);
		}
	};
	return (
		<Container className="pb-4">
			{!currentUser ? (
				<Alert variant="info">
					You Are not logged in <Link to="/login"> Sign In</Link> To see your
					orders
				</Alert>
			) : (
				<>
					<h2 className="mb-4">Order {orderDetails._id} </h2>
					<Row>
						<Col md={8}>
							<Card className="mb-3">
								<Card.Header>Shipping</Card.Header>
								<Card.Body>
									<p>
										<strong>Name :</strong> {currentUser.name}
									</p>
									<p>
										<strong>Address :</strong> {orderDetails.address}
									</p>
									{orderDetails.isDelivered ? (
										<Alert variant="success">
											Deliverd at{' '}
											{moment(orderDetails.DeliveredAt).format('MM/DD/YYYY')}
										</Alert>
									) : (
										<Alert variant="danger">Not Delivered Yet</Alert>
									)}
								</Card.Body>
							</Card>

							<Card className="mb-3">
								<Card.Header>Payment</Card.Header>
								<Card.Body>
									<p>
										<strong>Method :</strong> {orderDetails.paymentMethod}
									</p>
									{orderDetails.isPaid ? (
										<Alert variant="success">
											Paid at {moment(orderDetails.paidAt).format('MM/DD/YYYY')}
										</Alert>
									) : (
										<Alert variant="danger">Not Paid Yet</Alert>
									)}
								</Card.Body>
							</Card>

							<Card className="mb-5">
								<Card.Header>Items</Card.Header>
								<Card.Body>
									<ListGroup variant="flush">
										{orderDetails &&
											orderDetails.items &&
											orderDetails.items.map((p, idx) => (
												<ListGroup.Item key={idx}>
													<Row className="align-items-center text-center text-md-left">
														<Col md={5} className="me-1 ">
															{p && p.product && (
																<Image
																	src={
																		process.env.REACT_APP_IMAGE_FOLDER +
																		p.product.image
																	}
																	className="img-thumbnail me-2"
																	rounded
																	width={'70px'}
																/>
															)}
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
													<strong>
														${orderDetails && orderDetails.itemsPrice}
													</strong>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item className="mb-2">
											<Row>
												<Col>shipping</Col>
												<Col className="ms-auto ">
													<strong>
														${orderDetails && orderDetails.shipping}
													</strong>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item className="mb-2">
											<Row>
												<Col>Tax</Col>
												<Col className="ms-auto">
													<strong>${orderDetails && orderDetails.tax}</strong>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item className="mb-2">
											<Row>
												<Col>Order Total</Col>
												<Col className="ms-auto">
													<strong>
														${orderDetails && orderDetails.totalPrice}
													</strong>
												</Col>
											</Row>
										</ListGroup.Item>
										{orderDetails.isPaid ||
										(currentUser.isAdmin &&
											currentUser._id !== orderDetails.userId) ? (
											<></>
										) : orderDetails.paymentMethod === 'paypal' ? (
											<ListGroup.Item className="mb-2">
												<PaypalCheckoutButton
													items={orderDetails.items}
													totalPrice={orderDetails.totalPrice}
													orderId={orderId}
													setOrderDetails={setOrderDetails}
												/>
											</ListGroup.Item>
										) : (
											<>stripe</>
										)}
										{orderDetails.isPaid &&
											!orderDetails.isDelivered &&
											currentUser.isAdmin && (
												<ListGroup.Item className="mb-2">
													<Button
														className="container-fluid"
														variant="success"
														onClick={handleDeliver}
													>
														{' '}
														Deliver{' '}
													</Button>
												</ListGroup.Item>
											)}
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

export default Order;
