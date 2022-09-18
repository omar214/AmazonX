import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import data from '../data/data.js';
import { Link } from 'react-router-dom';

const Order = () => {
	return (
		<Container>
			<h4>Order History</h4>
			<Table
				hover
				responsive
				style={{ borderCollapse: 'separate', borderSpacing: '0 30px' }}
			>
				<thead className="border-bottom border-5 border-dark">
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
					{data.products.map((p) => (
						<tr className="mb-3">
							<td>62b08e0416af302849cabb32</td>
							<td>2022-06-20</td>
							<td>
								<strong>$250</strong>
							</td>
							<td>No</td>
							<td>NO</td>
							<td>
								<Link
									to="/orders/asdasd"
									// className='text-dark'
								>
									Details
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default Order;
