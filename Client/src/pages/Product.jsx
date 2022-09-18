import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import data from '../data/data.js';
import Image from 'react-bootstrap/Image';
import Review from '../components/Review.jsx';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const Product = () => {
	const params = useParams();
	const { id: productName } = params;
	// TODO fetch product and import it dynamic

	const [user, setUser] = useState(false);
	const p = data.products[0];

	const handleSubmitReview = (e) => {
		e.preventDefault();
	};
	return (
		<Container>
			{/* Product Details */}
			<Row className="mb-4">
				<Col md={6}>
					<Image src={p.image} className="img-thumbnail" />
				</Col>
				<Col md={3}>
					<h2> {p.name} </h2>
					<hr />
					<Review rating={p.rating} numReviews={p.numReviews} />
					<hr />
					<p>
						<strong>${p.price}</strong>
					</p>
					<hr />
					<Image
						src={p.image}
						className="img-thumbnail d-sm-none d-md-inline"
						width={'150px'}
					/>
					<hr className="d-sm-none d-md-block" />
					Description :<p>{p.description}</p>
				</Col>
				<Col md={3}>
					<ListGroup>
						<ListGroup.Item className="p-4">
							<Row>
								<Col> Price :</Col>
								<Col className="ms-auto">
									<strong> ${p.price} </strong>
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item className="p-4">
							<Row>
								<Col> Status :</Col>
								<Col className="ms-auto">
									{p.countInStock > 0 ? (
										<Badge bg="success">in Stock</Badge>
									) : (
										<Badge bg="danger">out of stock</Badge>
									)}
								</Col>
							</Row>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>

			{/* Fetched Reviews */}
			{/* TODO fetch reviews && make this component */}
			<ListGroup className="mb-3">
				<ListGroup.Item>
					<strong className="d-block">My Name</strong>
					<Review rating={4} numReviews={-1} />
					<p>2022-06-22</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi a
						tempora molestiae consequatur reprehenderit aperiam magni sunt est
						pariatur velit!
					</p>
				</ListGroup.Item>
				<ListGroup.Item>
					<strong className="d-block">My Name</strong>
					<Review rating={4} numReviews={-1} />
					<p>2022-06-22</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi a
						tempora molestiae consequatur reprehenderit aperiam magni sunt est
						pariatur velit!
					</p>
				</ListGroup.Item>
				<ListGroup.Item>
					<strong className="d-block">My Name</strong>
					<Review rating={4} numReviews={-1} />
					<p>2022-06-22</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi a
						tempora molestiae consequatur reprehenderit aperiam magni sunt est
						pariatur velit!
					</p>
				</ListGroup.Item>
			</ListGroup>

			{/* Write Review */}
			{user ? (
				<>
					<h2> Write Customer Review </h2>
					<Form onSubmit={handleSubmitReview}>
						<Form.Select aria-label="Default select example">
							<option>Open this select menu</option>
							<option value="1">1- Poor</option>
							<option value="2">2- Fair</option>
							<option value="3">3- Good</option>
							<option value="4">4- Very Good</option>
							<option value="5">5- Excellent</option>
						</Form.Select>

						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Review </Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Write Your Review"
							/>
						</Form.Group>

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
		</Container>
	);
};

export default Product;
