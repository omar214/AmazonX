import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import data from '../data/data.js';
import { Product } from '../components';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
	const [products, setProducts] = useState({
		items: [],
		loading: false,
		error: false,
	});

	useEffect(() => {
		const fecthData = async () => {
			setProducts((prev) => ({ ...prev, loading: true }));
			try {
				const { data: res } = await API.get('/products');
				setProducts({ loading: false, error: false, items: res.products });
			} catch (error) {
				setProducts((prev) => ({ ...prev, loading: false, error: true }));
				console.log(error.message);
			}
		};
		fecthData();
	}, []);
	return (
		<Container>
			<h2> Featured Products </h2>
			<Row>
				{products.loading ? (
					<CircularProgress />
				) : products.error ? (
					<Alert variant="danger">Error While fetching products</Alert>
				) : (
					products.items.map((p, idx) => (
						<Col sm={6} md={4} lg={3} className="mb-3" key={p._id}>
							<Product p={p} />
						</Col>
					))
				)}
			</Row>
		</Container>
	);
};

export default Home;
