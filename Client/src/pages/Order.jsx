import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
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
			<h2 className="mb-4">Order 62b08e0416af30284 </h2>
			<Row>
				<Col md={8}>
					<Card className="mb-3">
						<Card.Header>Shipping</Card.Header>
						<Card.Body>
							<p>
								<strong>Name :</strong> user Name
							</p>
							<p>
								<strong>Address :</strong> user Address
							</p>
							<Alert variant="success">
								Delivered at 2022-06-29T02:01:57.964Z
							</Alert>
						</Card.Body>
					</Card>

					<Card className="mb-3">
						<Card.Header>Payment</Card.Header>
						<Card.Body>
							<p>
								<strong>Method :</strong> Stripe
							</p>
							<Alert variant="success">Paid at 2022-06-20T17:52:43.432Z</Alert>
							<Alert variant="danger">Not Paid Yet</Alert>
						</Card.Body>
					</Card>

					<Card className="mb-5">
						<Card.Header>Items</Card.Header>
						<Card.Body>
							<ListGroup variant="flush">
								{data.products.map((p) => (
									<ListGroup.Item>
										<Row className="align-items-center">
											<Col sm={6} className="me-1 ">
												<Image
													src={p.image}
													className="img-thumbnail me-2"
													rounded
													width="70px"
												/>
												<Link to={`/products/${p.name}`}>{p.name}</Link>
											</Col>

											<Col sm={4} className="me-1 ">
												{cartCount} item
											</Col>

											<Col className="me-1 ">
												<strong>{p.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>

				<Col md={4} className="mt-2 mt-md-0">
					<Card>
						<Card.Body>
							<Card.Title>Order Summary</Card.Title>
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
										<Col>
											<strong> Order Total</strong>
										</Col>
										<Col className="ms-auto">
											<strong>$10</strong>
										</Col>
									</Row>
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
