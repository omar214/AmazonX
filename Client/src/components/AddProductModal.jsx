import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import API from '../api/api.js';
import { toast } from 'react-toastify';

function AddProductModal({ handleClose, show, addProduct }) {
	const formRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState('');

	const handleAddProduct = async (e) => {
		e.preventDefault();

		let name = formRef.current.name.value.trim(),
			description = formRef.current.description.value.trim(),
			price = formRef.current.price.value.trim(),
			countInStock = formRef.current.countInStock.value.trim(),
			category = formRef.current.category.value.trim(),
			image = formRef.current.image.files[0],
			brand = formRef.current.brand.value.trim();

		setErrorMessage('');
		console.log(image);
		if (
			!name ||
			!description ||
			!price ||
			!countInStock ||
			!category ||
			!brand ||
			!image
		)
			return setErrorMessage('Please Enter All Fields');

		try {
			let data = new FormData();
			data.append('image', image); //<-- CHANGED .value to .files[0]
			data.append('name', name);
			data.append('description', description);
			data.append('price', price);
			data.append('countInStock', countInStock);
			data.append('category', category);
			data.append('brand', brand);

			console.log('asd');
			const { data: res } = await API.post('/products', data, {
				'Content-Type': 'multipart/form-data',
			});
			console.log(res);
			addProduct(res.product);
			formRef.current.reset();
			handleClose();
		} catch (error) {
			setErrorMessage('Error while Adding Product');
			console.log('erro fetching cart');
		}
	};
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddProduct} ref={formRef}>
						<Form.Group className="mb-3">
							<Form.Label> Name</Form.Label>
							<Form.Control
								required
								placeholder="enter your name"
								type="text"
								name="name"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label> Image</Form.Label>
							<Form.Control
								required
								placeholder="enter Image"
								type="file"
								name="image"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label> Description</Form.Label>
							<Form.Control
								required
								placeholder="enter Description"
								type="text"
								name="description"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label> Price</Form.Label>
							<Form.Control
								required
								placeholder="enter Price"
								type="number"
								name="price"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label> count in stock</Form.Label>
							<Form.Control
								required
								placeholder="enter count in stock"
								type="number"
								name="countInStock"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label> category</Form.Label>
							<Form.Control
								required
								placeholder="enter category"
								type="text"
								name="category"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label> Brand</Form.Label>
							<Form.Control
								required
								placeholder="enter Brand"
								type="text"
								name="brand"
							/>
						</Form.Group>

						{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Close
					</Button>
					<Button variant="success" onClick={handleAddProduct}>
						Add Product
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddProductModal;
