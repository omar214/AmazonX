import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import { CheckoutSteps } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPaymentMethod } from '../redux/cartSlice.js';

const Payment = () => {
	const { paymentMethod } = useSelector((state) => state.cart);
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmitPayment = (e) => {
		e.preventDefault();
		const method = e.target.group1.value;

		dispatch(setPaymentMethod(method));
		navigate('/placeorder');
	};
	return (
		<Container>
			{!currentUser ? (
				<Alert variant="info">
					You Are not logged in <Link to="/login"> Sign In</Link>
				</Alert>
			) : (
				<>
					<CheckoutSteps step1 step2 step3 />
					<Row className="justify-content-center mb-5">
						<Col md={6}>
							<h2 className="mb-3">Shipping Address</h2>
							<Form onSubmit={handleSubmitPayment}>
								<div className="mb-3 ">
									<Form.Check
										label="paypal"
										name="group1"
										value="paypal"
										type="radio"
										defaultChecked={paymentMethod === 'paypal'}
									/>
								</div>
								<div className="mb-3">
									<Form.Check
										label="stripe"
										name="group1"
										value="stripe"
										type="radio"
										defaultChecked={paymentMethod === 'stripe'}
									/>
								</div>

								<Button type="submit"> Continue</Button>
							</Form>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default Payment;
