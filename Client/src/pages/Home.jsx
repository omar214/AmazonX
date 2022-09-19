import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from '../data/data.js';
import { Product } from '../components';

const Home = () => {
	return (
		<Container>
			<h2> Featured Products </h2>
			<Row>
				{/* TODO make dynamic products */}
				{data.products.map((p) => (
					<Col sm={6} md={4} lg={3} className="mb-3" key={p.slug}>
						<Product p={p} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Home;