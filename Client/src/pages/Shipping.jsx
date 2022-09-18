import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { CheckoutSteps } from '../components';

const Shipping = () => {
	const handleSubmitAddress = (e) => {
		e.preventDefault();
	};
	return (
		<Container>
			<CheckoutSteps step1 step2 />
			<Row className="justify-content-center mb-5">
				<Col md={6}>
					<h2 className="mb-3">Shipping Address</h2>
					<Form onSubmit={handleSubmitAddress}>
						<FloatingLabel label="Full Name" className="mb-3">
							<Form.Control type="email" placeholder="name@example.com" />
						</FloatingLabel>

						<FloatingLabel label="Address" className="mb-3">
							<Form.Control type="email" placeholder="name@example.com" />
						</FloatingLabel>

						<FloatingLabel label="City" className="mb-3">
							<Form.Control type="email" placeholder="name@example.com" />
						</FloatingLabel>

						<FloatingLabel label="Postal Code" className="mb-3">
							<Form.Control type="email" placeholder="name@example.com" />
						</FloatingLabel>

						<FloatingLabel label="Country" className="mb-3">
							<Form.Control type="email" placeholder="name@example.com" />
						</FloatingLabel>

            {/* TODO check if submit done nav to payment */}
						<Button type="submit"> Submit</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Shipping;
