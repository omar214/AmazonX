import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import API from '../api/api.js';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice.js';

function Signup() {
	const formRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let name = formRef.current.name.value.trim(),
			email = formRef.current.email.value.trim(),
			password = formRef.current.password.value.trim(),
			confirmPassword = formRef.current.confirmPassword.value.trim();

		setErrorMessage([]);
		let err = [];
		if (!name || !email || !password || !confirmPassword) {
			err.push('missing field');
		}
		if (password !== confirmPassword) {
			err.push('password not equal confirm password');
		}
		if (err.length !== 0) {
			setErrorMessage(err);
			return;
		}

		dispatch(loginStart());
		try {
			const { data: res } = await API.post('/auth/signup', {
				name,
				email,
				password,
			});
			formRef.current.reset();
			localStorage.setItem('access-token', res.token);

			dispatch(loginSuccess(res.user));
			navigate('/');
		} catch (error) {
			dispatch(loginFailure('Invalid email or password'));
			if (error.response.status === 409) {
				setErrorMessage(['Email already exists']);
			}
		}
	};
	return (
		<Container>
			<Row className="d-flex justify-content-center">
				<Col sm={6}>
					<h3>Sign up</h3>
					<Form onSubmit={handleSubmit} ref={formRef}>
						<Form.Group className="mb-3" controlId="formBasicName">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Your Name"
								name="name"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								name="email"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								name="password"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicConfirmPassword">
							<Form.Label>confirm Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="confirm Password"
								name="confirmPassword"
							/>
						</Form.Group>

						{errorMessage &&
							errorMessage.map((e, idx) => (
								<Alert key={idx} variant="danger">
									{e}
								</Alert>
							))}

						<Button variant="primary" type="submit">
							Submit
						</Button>

						<p>
							Already have an account?
							<Link to="/login" variant="info" className="ms-2">
								Log-In{' '}
							</Link>
						</p>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default Signup;
