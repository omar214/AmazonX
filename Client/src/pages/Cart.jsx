import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import data from '../data/data.js';
import { Product } from '../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
	const [cartCount, setCartCount] = useState(3);
	// const p = data.products[0];

	return (
		<Container>
			<h2 className="mb-4">Shopping Cart</h2>
			<Row>
				<Col sm={12} md={8}>
					{cartCount > 0 ? (
						<ListGroup>
							{data.products.map((p) => (
								<ListGroup.Item>
									<Row className="align-items-center">
										<Col sm={4} className="me-1 ">
											<Image
												src={p.image}
												className="img-thumbnail me-2"
												rounded
												width={'70px'}
											/>
											<Link to={`/products/${p.name}`}>{p.name}</Link>
										</Col>

										<Col sm={4} className="me-1 ">
											<Stack direction="horizontal" gap={1}>
												<Button size="sm" variant="light">
													<RemoveIcon />
												</Button>
												{cartCount}
												<Button size="sm" variant="light">
													<AddBoxIcon />
												</Button>
											</Stack>
										</Col>

										<Col className="me-1 ">
											<strong>{p.price}</strong>
										</Col>
										<Col className="me-1 ">
											<DeleteIcon />
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					) : (
						<Alert variant="info">
							Cart is empty. <Link className="text-info"> Go Shopping</Link>
						</Alert>
					)}
				</Col>
				<Col sm={12} md={4} className="mt-5 mt-md-0">
					<ListGroup>
						<ListGroup.Item className="p-sm-4 text-center mt-sm-4 mt-md-0">
							<h4>Subtotal ({cartCount} items) : $0</h4>
						</ListGroup.Item>
						<ListGroup.Item className="p-4 d-flex justify-content-center">
							<Button size="lg">Proceed To Check out</Button>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
};

export default Cart;
