import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Order = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [orders, setOrders] = useState({
		items: [],
		loading: false,
		error: false,
	});
	useEffect(() => {
		const fecthData = async () => {
			setOrders((prev) => ({ ...prev, loading: true }));
			try {
				const { data: res } = await API.get('/orders/mine');
				setOrders({ loading: false, error: false, items: res.orders });
			} catch (error) {
				setOrders((prev) => ({ ...prev, loading: false, error: true }));
				console.log(error.message);
			}
		};
		currentUser && fecthData();
	}, []);
	return (
		<Container>
			{!currentUser ? (
				<Alert variant="info">
					You Are not logged in <Link> Sign In</Link> To see your orders
				</Alert>
			) : (
				<>
					<h4>Order History</h4>

					{orders.loading ? (
						<CircularProgress />
					) : orders.error ? (
						<Alert variant="danger">Error While fetching orders</Alert>
					) : (
						<Table
							hover
							responsive
							// style={{ borderCollapse: 'separate', borderSpacing: '0 30px' }}
						>
										<thead
											className="border-bottom border-2 border-dark"
										>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>DELIVERED</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{orders.items.map((p) => (
									<tr className="mb-3">
										<td>{p._id}</td>
										<td>{moment(p.createdAt).format('MM/DD/YYYY')}</td>
										<td>
											<strong>${p.totalPrice}</strong>
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
											<Button as={Link} to={`/orders/${p._id}`} variant="light">
												Details
											</Button>
											{/* <Link to={`/orders/${p._id}`}>Details</Link> */}
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

export default Order;
