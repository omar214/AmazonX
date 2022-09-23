import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice.js';
import { clearCart, setCartItems } from '../redux/cartSlice.js';
import { useEffect } from 'react';
import API from '../api/api.js';

function MyNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);
	const { cartCount } = useSelector((state) => state.cart);

	useEffect(() => {
		const fecthData = async () => {
			try {
				const { data: res } = await API.get('/cart');
				dispatch(setCartItems(res.cart));
			} catch (error) {
				console.log(error.message);
			}
		};
		if (currentUser) {
			fecthData();
		}
	}, [dispatch, currentUser]);

	const handleSearch = (e) => {
		e.preventDefault();
		const category = e.target.search.value.trim() || 'all';
		navigate(`/search?category=${category}`);
	};

	const handleLogOut = (e) => {
		dispatch(logout());
		dispatch(clearCart());
		navigate('/login');
	};
	return (
		<Navbar
			collapseOnSelect
			expand="md"
			bg="dark"
			variant="dark"
			sticky="top"
			className="mb-3"
		>
			<Container>
				<Navbar.Brand as={Link} to="/" className="text-primary">
					Amazon Store
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />

				<Navbar.Collapse id="responsive-navbar-nav">
					<Form className="d-flex mt-3 mt-md-0" onSubmit={handleSearch}>
						<InputGroup>
							<Form.Control placeholder="Search" name="search" />
							<Button variant="primary" type="submit">
								<SearchIcon />
							</Button>
						</InputGroup>
					</Form>

					<Nav className="ms-auto">
						<Nav.Link as={Link} to="cart">
							Cart
							{cartCount > 0 && (
								<Badge pill bg="danger">
									{cartCount}
								</Badge>
							)}
						</Nav.Link>
						{currentUser ? (
							<NavDropdown
								title={currentUser.name}
								id="collasible-nav-dropdown"
							>
								<NavDropdown.Item as={Link} to="user">
									User Profile
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="orders">
									Order History
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={handleLogOut}>
									Log out
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Nav.Link as={Link} to="login">
								Log in
							</Nav.Link>
						)}
						{currentUser && currentUser.isAdmin && (
							<NavDropdown title={'Admin'} id="Admin-nav-dropdown">
								<NavDropdown.Item as={Link} to="admin/dashboard">
									DASHBOARD
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={Link} to="admin/orders">
									ORDERS
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="admin/products">
									PRODUCTS
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="admin/users">
									USERS
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default MyNavbar;
