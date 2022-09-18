import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import { CheckoutSteps } from '../components';

const Payment = () => {
	const handleSubmitPayment = (e) => {
		e.preventDefault();
	};
	return (
		<Container>
			<CheckoutSteps step1 step2 step3 />
			<Row className="justify-content-center mb-5">
				<Col md={6}>
					<h2 className="mb-3">Shipping Address</h2>
					<Form onSubmit={handleSubmitPayment}>
						<div className="mb-3 ">
							<Form.Check label="paypal" name="group1" type="radio" />
						</div>
						<div className="mb-3">
							<Form.Check label="stripe" name="group1" type="radio" />
						</div>

						<Button type="submit"> Continue</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Payment;
