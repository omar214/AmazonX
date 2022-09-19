import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import data from '../data/data.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckoutSteps from '../components/CheckoutSteps.jsx';

const PlaceOrder = () => {
	const [cartCount, setCartCount] = useState(3);
	const p = data.products[0];

	return (
		<Container className="pb-4">
			<CheckoutSteps step1 step2 step3 step4 />

			<h2 className="mb-4">Preview Order</h2>
			<Row>
				<Col lg={8}>
					<Card className="mb-3">
						<Card.Header>Shipping</Card.Header>
						<Card.Body>
							<p>
								<strong>Name :</strong> user Name
							</p>
							<p>
								<strong>Address :</strong> user Address
							</p>
							<Card.Link as={Link} to="/shipping">
								Edit
							</Card.Link>
						</Card.Body>
					</Card>

					<Card className="mb-3">
						<Card.Header>Payment</Card.Header>
						<Card.Body>
							<p>
								<strong>Method :</strong> Stripe
							</p>
							<Card.Link as={Link} to="/payment">
								Edit
							</Card.Link>
						</Card.Body>
					</Card>

					<Card className="mb-5">
						<Card.Header>Items</Card.Header>
						<Card.Body>
							<ListGroup variant="flush">
								{data.products.map((p) => (
									<ListGroup.Item>
										<Row className="align-items-center text-center text-md-left">
											<Col md={4} className="me-1 ">
												<Image
													src={p.image}
													className="img-thumbnail me-2"
													rounded
													width={'70px'}
												/>
												<Link to={`/products/${p.name}`}>{p.name}</Link>
											</Col>

											<Col md={4} className="me-1 ">
												<Button size="sm" variant="light">
													<AddBoxIcon />
												</Button>
												{cartCount}
												<Button size="sm" variant="light">
													<RemoveIcon />
												</Button>
											</Col>

											<Col className="me-1 ">
												<strong> $ {p.price}</strong>
											</Col>
											<Col>
												<DeleteIcon />
											</Col>
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>

							<Card.Link as={Link} to="/cart">
								Edit
							</Card.Link>
						</Card.Body>
					</Card>
				</Col>

				<Col lg={4} className="mt-2 mt-md-0">
					<Card>
						<Card.Header>Order Summary</Card.Header>
						<Card.Body>
							<ListGroup variant="flush">
								<ListGroup.Item className="mb-2">
									<Row>
										<Col>items</Col>
										<Col className="ms-auto">$1351</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item className="mb-2">
									<Row>
										<Col>shipping</Col>
										<Col className="ms-auto">$10</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item className="mb-2">
									<Row>
										<Col>Tax</Col>
										<Col className="ms-auto">$30</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item className="mb-2">
									<Row>
										<Col>Order Total</Col>
										<Col className="ms-auto">$10</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Button size="lg">Place Order</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default PlaceOrder;
