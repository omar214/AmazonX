import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const AdminOrders = () => {
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const [users, setUsers] = useState({
		items: [],
		loading: false,
		error: false,
	});
	useEffect(() => {
		if (!currentUser.isAdmin) navigate('/');

		const fecthData = async () => {
			setUsers((prev) => ({ ...prev, loading: true }));
			try {
				const { data: res } = await API.get('/users');
				setUsers({ loading: false, error: false, items: res.users });
			} catch (error) {
				setUsers((prev) => ({ ...prev, loading: false, error: true }));
				console.log(error.message);
			}
		};
		currentUser && fecthData();
	}, [currentUser, navigate]);

	const handleDeletUser = async (id) => {
		try {
			await API.delete(`/users/${id}`);
			const filterd = users.items.filter((e) => e._id !== id);
			setUsers({
				loading: false,
				error: false,
				items: filterd,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<Container>
			{!currentUser ? (
				<Alert variant="info">
					You Are not logged in <Link to="/login"> Sign In</Link>
				</Alert>
			) : (
				<>
					<h4>Users </h4>

					{users.loading ? (
						<CircularProgress />
					) : users.error ? (
						<Alert variant="danger">Error While fetching users</Alert>
					) : (
						<Table hover responsive>
							<thead className="border-bottom border-2 border-dark">
								<tr>
									<th>ID</th>
									<th>Name </th>
									<th>Email</th>
									<th>IS ADMIN</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{users.items.map((p, idx) => (
									<tr className="mb-3" key={idx} varient={'danger'}>
										<td>{p._id}</td>
										<td>{p.name}</td>
										<td>{p.email}</td>
										<td>
											{p.isAdmin ? (
												<Badge bg="success">Yes</Badge>
											) : (
												<Badge bg="danger">No</Badge>
											)}
										</td>
										<td>
											<Button
												as={Link}
												to={`/admin/users/${p._id}`}
												variant="light"
												size="sm"
												className="me-2 mb-sm-2 mb-lg-0"
											>
												Edit
											</Button>
											<Button
												variant="outline-danger"
												size="sm"
												onClick={() => handleDeletUser(p._id)}
											>
												Delete
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</>
			)}
		</Container>
	);
};

export default AdminOrders;
