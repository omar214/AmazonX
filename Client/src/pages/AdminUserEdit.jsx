import { useContext, useEffect, useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/api.js';

const AdminUserEdit = () => {
	const params = useParams();
	const { id: userId } = params;
	const [user, setUser] = useState({});
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const fecthData = async () => {
			try {
				const { data: res } = await API.get(`/users/${userId}`);
				setUser(res.user);
			} catch (error) {
				console.log(error.message);
			}
		};
		fecthData();
	}, [userId]);
	const submitHandler = async (e) => {
		e.preventDefault();

		let name = e.target.name.value.trim(),
			email = e.target.email.value.trim(),
			isAdmin = e.target.isAdmin.checked;

		setSuccess(false);
		try {
			const { data: res } = await API.put(`/users/${user._id}`, {
				name,
				email,
				isAdmin,
			});
			setSuccess(true);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container className="small-container">
			<Row className="d-flex justify-content-center">
				<Col sm={6}>
					<h1>Edit User userId</h1>

					<Form onSubmit={submitHandler}>
						<Form.Group className="mb-3" controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								defaultValue={user.name}
								name="name"
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								defaultValue={user.email}
								type="email"
								name="email"
								required
							/>
						</Form.Group>

						<Form.Check
							className="mb-3"
							type="checkbox"
							name="isAdmin"
							label="isAdmin"
							defaultChecked={user.isAdmin}
						/>
						{success && (
							<Alert variant="success">user updated successfully</Alert>
						)}
						<div className="mb-3">
							<Button type="submit">Update</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default AdminUserEdit;
