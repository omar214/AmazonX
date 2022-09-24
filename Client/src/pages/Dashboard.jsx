import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import API from '../api/api.js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { CircularProgress } from '@mui/material';

const Dashboard = () => {
	const [dashboardData, setDashboardData] = useState({
		loading: false,
		error: false,
		summary: {},
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: res } = await API.get('/orders/dashboard');
				setDashboardData({
					loading: false,
					summary: res,
				});
			} catch (err) {
				toast.dismiss();
				toast.error('Error While Fetchig dashboard');
				setDashboardData({
					loading: false,
					error: true,
				});
			}
		};
		fetchData();
	}, []);

	return (
		<Container>
			<h1>Dashboard</h1>
			{dashboardData.loading ? (
				<CircularProgress />
			) : dashboardData.error ? (
				<Alert variant="danger">Error while fetching Data</Alert>
			) : (
				<>
					<Row>
						<Col md={4}>
							<Card>
								<Card.Body>
									<Card.Title>
										{dashboardData.summary &&
										dashboardData.summary.users &&
										dashboardData.summary.users[0]
											? dashboardData.summary.users[0].numUsers
											: 0}
									</Card.Title>
									<Card.Text> Users</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card>
								<Card.Body>
									<Card.Title>
										{dashboardData.summary.orders &&
										dashboardData.summary.orders[0]
											? dashboardData.summary.orders[0].numOrders
											: 0}
									</Card.Title>
									<Card.Text> Orders</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card>
								<Card.Body>
									<Card.Title>
										$
										{dashboardData.summary.orders &&
										dashboardData.summary.orders[0]
											? dashboardData.summary.orders[0].totalSales.toFixed(2)
											: 0}
									</Card.Title>
									<Card.Text> Orders</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<div className="my-3">
						<h2>Sales</h2>
						{dashboardData.summary &&
						dashboardData.summary.dailyOrders &&
						dashboardData.summary.dailyOrders.length === 0 ? (
							<Alert variant="danger">No Sale</Alert>
						) : (
							dashboardData.summary &&
							dashboardData.summary.dailyOrders && (
								// <>asd</>
								<Chart
									width="100%"
									height="400px"
									chartType="AreaChart"
									loader={<div>Loading Chart...</div>}
									data={[
										['Date', 'Sales'],
										...dashboardData.summary.dailyOrders.map((x) => [
											x._id,
											x.sales,
										]),
									]}
								/>
							)
						)}
					</div>
					<div className="my-3">
						<h2>Categories</h2>
						{dashboardData.summary &&
						dashboardData.summary.productCategories &&
						dashboardData.summary.productCategories.length === 0 ? (
							<Alert>No Category</Alert>
						) : (
							dashboardData.summary &&
							dashboardData.summary.productCategories && (
								<Chart
									width="100%"
									height="400px"
									chartType="PieChart"
									loader={<div>Loading Chart...</div>}
									data={[
										['Category', 'Products'],
										...dashboardData.summary.productCategories.map((x) => [
											String(x._id),
											x.count,
										]),
									]}
								/>
							)
						)}
					</div>
				</>
			)}
		</Container>
	);
};

export default Dashboard;
