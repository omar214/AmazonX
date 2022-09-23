import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { CheckoutSteps } from '../components';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../redux/cartSlice.js';

const Shipping = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState('');
	const formRef = useRef(null);
	const { address } = useSelector((state) => state.cart);
	const { currentUser } = useSelector((state) => state.user);

	const handleSubmitAddress = (e) => {
		e.preventDefault();

		let address = formRef.current.address.value.trim(),
			city = formRef.current.city.value.trim(),
			postalCode = formRef.current.postalCode.value.trim(),
			country = formRef.current.country.value.trim();

		setErrorMessage('');
		if (!address || !city || !postalCode || !country) {
			setErrorMessage('missing field , Please Enter All Fields');
			return;
		}

		dispatch(
			setAddress({
				address,
				postalCode,
				city,
				country,
			}),
		);
		navigate('/payment');
	};
	return (
		<Container>
			{!currentUser ? (
				<Alert variant="info">
					You Are not logged in <Link to="/login"> Sign In</Link> To see your
					orders
				</Alert>
			) : (
				<>
					<CheckoutSteps step1 step2 />
					<Row className="justify-content-center mb-5">
						<Col md={6}>
							<h2 className="mb-3">Shipping Address</h2>
							<Form onSubmit={handleSubmitAddress} ref={formRef}>
								<FloatingLabel label="Country" className="mb-3">
									<Form.Control
										placeholder="enter country"
										type="text"
										defaultValue={address.country}
										name="country"
									/>
								</FloatingLabel>

								<FloatingLabel label="City" className="mb-3">
									<Form.Control
										placeholder="enter city"
										type="text"
										defaultValue={address.city}
										name="city"
									/>
								</FloatingLabel>

								<FloatingLabel label="Address" className="mb-3">
									<Form.Control
										placeholder="enter address"
										type="text"
										defaultValue={address.address}
										name="address"
									/>
								</FloatingLabel>

								<FloatingLabel label="Postal Code" className="mb-3">
									<Form.Control
										placeholder="enter postalCode"
										type="text"
										defaultValue={address.postalCode}
										name="postalCode"
									/>
								</FloatingLabel>

								{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

								<Button type="submit"> Submit</Button>
							</Form>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default Shipping;
