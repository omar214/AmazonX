import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<Row className="d-flex mb-3">
			<Col
				className={`border-bottom border-5 pb-3 ${
					step1 && 'border-secondary text-secondary'
				}`}
			>
				Sign in
			</Col>
			<Col
				className={`border-bottom border-5 pb-3 ${
					step2 && 'border-secondary text-secondary'
				}`}
			>
				Shipping
			</Col>
			<Col
				className={`border-bottom border-5 pb-3 ${
					step3 && 'border-secondary text-secondary'
				}`}
			>
				Payment
			</Col>
			<Col
				className={`border-bottom border-5 pb-3 ${
					step4 && 'border-secondary text-secondary'
				}`}
			>
				Place Order
			</Col>
		</Row>
	);
};

export default CheckoutSteps;
