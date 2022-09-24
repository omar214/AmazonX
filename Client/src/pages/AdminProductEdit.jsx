import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import API from '../api/api.js';
import { toast } from 'react-toastify';

const AdminUserEdit = () => {
	const params = useParams();
	const { id: productId } = params;
	const formRef = useRef(null);
	const [product, setProduct] = useState({});
	const [success, setSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fecthData = async () => {
			try {
				const { data: res } = await API.get(`/products/${productId}`);
				setProduct(res.product);
			} catch (error) {
				console.log(error.message);
				toast.dismiss();
				toast.error('Error Fetching Products');
			}
		};
		fecthData();
	}, [productId]);

	const submitHandler = async (e) => {
		e.preventDefault();

		let name = formRef.current.name.value.trim(),
			description = formRef.current.description.value.trim(),
			price = formRef.current.price.value.trim(),
			countInStock = formRef.current.countInStock.value.trim(),
			category = formRef.current.category.value.trim(),
			// image = formRef.current.image.value.trim(),
			brand = formRef.current.brand.value.trim();

		setErrorMessage('');
		if (!name || !description || !price || !countInStock || !category || !brand)
			return setErrorMessage('Please Enter All Fields');
		setSuccess(false);
		try {
			const { data: res } = await API.put(`/products/${product._id}`, {
				name,
				description,
				price,
				countInStock,
				category,
				// image,
				brand,
			});
			toast.dismiss();
			toast.success('Product Edited Succefully');
			setSuccess(true);
		} catch (error) {
			toast.dismiss();
			toast.error('Error while editing product');
			console.log(error);
		}
	};
	return (
		<Container className="small-container">
			<Row className="d-flex justify-content-center">
				<Col sm={6}>
					<h1>Edit Product </h1>
					<p>{product._id}</p>

					<Form onSubmit={submitHandler} ref={formRef}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Name </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your name"
								defaultValue={product.name}
								name="name"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Description </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your Description"
								defaultValue={product.description}
								name="description"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Price </Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter  price"
								defaultValue={product.price}
								name="price"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>count in stock </Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter  price"
								defaultValue={product.countInStock}
								name="countInStock"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Category </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter categorie"
								defaultValue={product.category}
								name="category"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Brand </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter brand"
								defaultValue={product.brand}
								name="brand"
							/>
						</Form.Group>
						{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
						{success && (
							<Alert variant="success">Product updated successfully</Alert>
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
