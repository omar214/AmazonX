import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import API from '../api/api.js';

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
			// image = formRef.current.image.value.trim(),
			brand = formRef.current.brand.value.trim();

		setErrorMessage('');
		if (!name || !description || !price || !countInStock || !category || !brand)
			return setErrorMessage('Please Enter All Fields');

		try {
			const { data: res } = await API.post('/products', {
				name,
				description,
				price,
				countInStock,
				category,
				// image,
				brand,
			});
			console.log(res);

			addProduct(res.product);
			formRef.current.reset();
			handleClose();
		} catch (error) {
			setErrorMessage('Error while Adding Product');
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
						<FloatingLabel label="Name" className="mb-3">
							<Form.Control
								required
								placeholder="enter your name"
								type="text"
								name="name"
							/>
						</FloatingLabel>

						<FloatingLabel label="Description" className="mb-3">
							<Form.Control
								required
								placeholder="enter Description"
								type="text"
								name="description"
							/>
						</FloatingLabel>

						<FloatingLabel label="Price" className="mb-3">
							<Form.Control
								required
								placeholder="enter Price"
								type="number"
								name="price"
							/>
						</FloatingLabel>

						<FloatingLabel label="count in stock" className="mb-3">
							<Form.Control
								required
								placeholder="enter count in stock"
								type="price"
								name="countInStock"
							/>
						</FloatingLabel>

						<FloatingLabel label="category" className="mb-3">
							<Form.Control
								required
								placeholder="enter category"
								type="text"
								name="category"
							/>
						</FloatingLabel>

						{/* <FloatingLabel label="Image" className="mb-3">
							<Form.Control
								required
								placeholder="enter Image"
								type="text"
								name="image"
							/>
						</FloatingLabel> */}

						<FloatingLabel label="Brand" className="mb-3">
							<Form.Control
								required
								placeholder="enter Brand"
								type="text"
								name="brand"
							/>
						</FloatingLabel>
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
