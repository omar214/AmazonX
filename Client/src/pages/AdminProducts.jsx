import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import AddProductModal from '../components/AddProductModal.jsx';

const AdminProducts = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	const [products, setProducts] = useState({
		items: [],
		loading: false,
		error: false,
	});
	useEffect(() => {
		if (!currentUser.isAdmin) navigate('/');

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
		currentUser && fecthData();
	}, [currentUser, navigate]);

	const addProduct = (product) => {
		let temp = products.items;
		temp.push(product);
		setProducts({
			loading: false,
			error: false,
			items: temp,
		});
	};
	const handleDeletProduct = async (id) => {
		try {
			await API.delete(`/products/${id}`);
			const filterd = products.items.filter((e) => e._id !== id);
			setProducts({
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
					{show && (
						<AddProductModal
							show={show}
							handleClose={() => setShow(false)}
							addProduct={addProduct}
						/>
					)}
					<Stack direction="horizontal" className="mb-3">
						<h4 className="me-auto">Products </h4>
						<Button variant="success" onClick={() => setShow(true)}>
							Add Product
						</Button>
					</Stack>
					{products.loading ? (
						<CircularProgress />
					) : products.error ? (
						<Alert variant="danger">Error While fetching products</Alert>
					) : (
						<Table hover responsive>
							<thead className="border-bottom border-2 border-dark">
								<tr>
									<th>ID</th>
									<th>Name </th>
									<th>PRICE</th>
									<th>CATEGORY</th>
									<th>BRAND</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{products.items.map((p, idx) => (
									<tr className="mb-3" key={idx} varient={'danger'}>
										<td>{p._id}</td>
										<td>{p.name}</td>
										<td>
											<strong>${p.price}</strong>
										</td>
										<td>{p.category[0]}</td>
										<td>{p.brand}</td>
										<td>
											<Button
												as={Link}
												to={`/admin/products/${p._id}`}
												variant="light"
												size="sm"
												className="me-2 mb-sm-2 mb-lg-0"
											>
												Edit
											</Button>
											<Button
												variant="outline-danger"
												size="sm"
												onClick={() => handleDeletProduct(p._id)}
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

export default AdminProducts;
