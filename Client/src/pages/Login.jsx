import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Login() {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<Container>
			<Row className="d-flex justify-content-center">
				<Col sm={6}>
					<h3>Log in</h3>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
						</Button>

						<p>
							New customer?
							<Link to="/signup" variant="info" className="ms-2">
								Create your account
							</Link>
						</p>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
