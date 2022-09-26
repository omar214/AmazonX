import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../api/api.js';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems } from '../redux/cartSlice.js';
import { toast } from 'react-toastify';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
const Cart = () => {
	// const [cartItems, setCartItems] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);
	const {
		cartCount,
		cart: { items: cartItems },
	} = useSelector((state) => state.cart);

	useEffect(() => {
		const fecthCart = async () => {
			try {
				const { data: res } = await API.get(`/cart`);
				if (!res.cart) return;
				dispatch(setCartItems(res.cart));
				console.log(res.cart);
			} catch (error) {
				console.log(error.message);
				toast.dismiss();
				toast.error('Error While Fetchig cart');
			}
		};
		currentUser && fecthCart();
	}, [dispatch]);

	const handleChangeQuantity = async (idx, num, productId) => {
		let temp = deepClone(cartItems);

		temp[idx].quantity += num;
		if (temp[idx].quantity === 0) {
			temp.splice(idx, 1);
		}
		try {
			const item = { quantity: num, product: productId };
			const { data: res } = await API.post('/cart', {
				items: [item],
			});
			dispatch(setCartItems(res.cart));
			// dispatch(setCartItems({ items: deepClone(temp) }));
			console.log(res.cart);
		} catch (error) {
			console.log(error);
		}

		dispatch(setCartItems({ items: deepClone(temp) }));
	};
	const handleDeleteItem = async (idx, productId) => {
		let temp = deepClone(cartItems);
		temp.splice(idx, 1);
		try {
			const { data: res } = await API.patch('/cart', {
				productId,
			});
			dispatch(setCartItems({ items: deepClone(temp) }));
			console.log(res.cart);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container className="pb-4">
			{!currentUser ? (
				<Alert variant="info">
					No Products in your Cart <Link to="/login"> Sign In</Link> and add
					products to your Cart
				</Alert>
			) : (
				<>
					<h2 className="mb-4">Shopping Cart</h2>
					<Row>
						<Col lg={8}>
							{cartCount > 0 ? (
								<ListGroup>
									{cartItems.map((p, idx) => (
										<ListGroup.Item key={idx}>
											<Row className="align-items-center text-center text-md-left">
												<Col md={4} className="me-1">
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
													<Link to={`/products/${p.product._id}`}>
														{p.product.name}
													</Link>
												</Col>

												<Col md={4} className="me-1 ">
													<Button
														size="sm"
														variant="light"
														onClick={(e) =>
															handleChangeQuantity(idx, 1, p.product._id)
														}
													>
														<AddBoxIcon />
													</Button>
													{p.quantity}
													<Button
														size="sm"
														variant="light"
														onClick={(e) =>
															handleChangeQuantity(idx, -1, p.product._id)
														}
														disabled={cartItems[idx].quantity === 1}
													>
														<RemoveIcon />
													</Button>
												</Col>

												<Col className="me-1 ">
													<strong>${p.product.price}</strong>
												</Col>
												<Col
													className="cursor-pointer"
													role="button"
													onClick={(e) => handleDeleteItem(idx, p.product._id)}
												>
													<DeleteIcon />
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							) : (
								<Alert variant="info">
									Cart is empty. <Link to="/">Go Shopping</Link>
								</Alert>
							)}
						</Col>
						<Col lg={4} className="mt-5 mt-lg-0">
							<ListGroup>
								<ListGroup.Item className="p-sm-4 text-center mt-sm-4 mt-md-0">
									<h4>
										Subtotal ({cartCount} items) :{' '}
										{cartItems &&
											cartItems.reduce(
												(acc, item) => acc + item.product.price * item.quantity,
												0,
											)}
									</h4>
								</ListGroup.Item>
								<ListGroup.Item className="p-4 d-flex justify-content-center">
									<Button
										size="lg"
										as={Link}
										className={cartCount === 0 && 'pe-none'}
										to="/shipping"
									>
										Proceed To Check out
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default Cart;
