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
import API from '../api/api.js';
import { loginSuccess } from '../redux/userSlice.js';

const Shipping = () => {
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState([]);
	const [isSuccess, setIsSucess] = useState(false);
	const formRef = useRef(null);
	const { currentUser } = useSelector((state) => state.user);

	const handleSubmitAddress = async (e) => {
		e.preventDefault();

		let name = formRef.current.name.value.trim(),
			email = formRef.current.email.value.trim(),
			oldPassword = formRef.current.oldPassword.value.trim(),
			newPassword = formRef.current.newPassword.value.trim(),
			confirmPassword = formRef.current.confirmPassword.value.trim();

		setErrorMessage([]);
		setIsSucess(false);

		let err = [];
		if (!name || !email || !oldPassword || !newPassword || !confirmPassword) {
			err.push('missing field , Please Enter All Fields');
		}
		if (newPassword !== confirmPassword) {
			err.push('password not equal confirm password');
		}
		if (err.length > 0) {
			setErrorMessage(err);
			return;
		}

		try {
			const { data: res } = await API.put(`/users/${currentUser._id}`, {
				name,
				email,
				password: newPassword,
			});
			formRef.current.reset();
			setIsSucess(true);

			dispatch(loginSuccess(res.user));
		} catch (error) {}
	};
	return (
		<Container>
			{!currentUser ? (
				<Alert variant="info">
					You Are not logged in <Link> Sign In</Link> To see your orders
				</Alert>
			) : (
				<>
					<Row className="justify-content-center mb-5">
						<Col md={6}>
							<h2 className="mb-3">User Profile</h2>
							<Form onSubmit={handleSubmitAddress} ref={formRef}>
								<FloatingLabel label="Name" className="mb-3">
									<Form.Control
										placeholder="enter your Name"
										type="text"
										defaultValue={currentUser.name}
										name="name"
									/>
								</FloatingLabel>
								<FloatingLabel label="email" className="mb-3">
									<Form.Control
										placeholder="enter your email"
										type="email"
										defaultValue={currentUser.email}
										name="email"
									/>
								</FloatingLabel>

								<FloatingLabel label="old password" className="mb-3">
									<Form.Control
										placeholder="enter password"
										type="password"
										name="oldPassword"
									/>
								</FloatingLabel>

								<FloatingLabel label="new password" className="mb-3">
									<Form.Control
										placeholder="enter new password"
										type="password"
										name="newPassword"
									/>
								</FloatingLabel>

								<FloatingLabel label="confirm new password" className="mb-3">
									<Form.Control
										placeholder="enter confirm new password"
										type="password"
										name="confirmPassword"
									/>
								</FloatingLabel>
								{errorMessage &&
									errorMessage.map((e, idx) => (
										<Alert key={idx} variant="danger">
											{e}
										</Alert>
									))}
								{isSuccess && (
									<Alert variant="success">user updated successfully</Alert>
								)}

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
