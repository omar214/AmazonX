import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AdminOrders = () => {
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const [orders, setOrders] = useState({
		items: [],
		loading: false,
		error: false,
	});
	useEffect(() => {
		if (!currentUser || !currentUser.isAdmin) navigate('/');
		const fecthData = async () => {
			setOrders((prev) => ({ ...prev, loading: true }));
			try {
				const { data: res } = await API.get('/orders');
				setOrders({ loading: false, error: false, items: res.orders });
			} catch (error) {
				setOrders((prev) => ({ ...prev, loading: false, error: true }));
				console.log(error.message);
				toast.dismiss();
				toast.error('Error While Fetching Orders');
			}
		};
		currentUser && fecthData();
	}, [currentUser, navigate]);

	const handleDeletOrder = async (id) => {
		try {
			await API.delete(`/orders/${id}`);
			const filterd = orders.items.filter((e) => e._id !== id);
			setOrders({
				loading: false,
				error: false,
				items: filterd,
			});
			toast.dismiss();
			toast.success('Order Deleted Successfully');
		} catch (error) {
			console.log(error.message);
			toast.dismiss();
			toast.error('Error While Deleting Order');
		}
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
					<h4>All Orders </h4>

					{orders.loading ? (
						<CircularProgress />
					) : orders.error ? (
						<Alert variant="danger">Error While fetching orders</Alert>
					) : (
						<Table hover responsive>
							<thead className="border-bottom border-2 border-dark">
								<tr>
									<th>ID</th>
									<th>User </th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>DELIVERED</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{orders.items.map((p, idx) => (
									<tr className="mb-3" key={idx}>
										<td>{p._id}</td>
										<td>{p.userId.name}</td>
										<td>{moment(p.createdAt).format('MM/DD/YYYY')}</td>
										<td>
											<strong>
												$
												{p.totalPrice +
													0.05 * p.totalPrice +
													Math.floor(0.14 * p.totalPrice)}
											</strong>
										</td>
										<td>
											{p.isPaid ? (
												<Badge bg="success">Yes</Badge>
											) : (
												<Badge bg="danger">No</Badge>
											)}
										</td>
										<td>
											{p.isDelivered ? (
												<Badge bg="success">Yes</Badge>
											) : (
												<Badge bg="danger">No</Badge>
											)}
										</td>
										<td>
											<Button
												as={Link}
												to={`/orders/${p._id}`}
												variant="light"
												size="sm"
												className="me-2 mb-sm-2 mb-lg-0"
											>
												Details
											</Button>
											<Button
												variant="outline-danger"
												size="sm"
												onClick={() => handleDeletOrder(p._id)}
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
