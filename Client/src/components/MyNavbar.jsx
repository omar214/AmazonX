import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function MyNavbar() {
	const [user, setUser] = useState(false);

	const handleSearch = (e) => {
		e.preventDefault();
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
					<Form className="d-flex" onSubmit={handleSearch}>
						<InputGroup>
							<Form.Control placeholder="Search" />
							<Button variant="primary">
								<SearchIcon />
							</Button>
						</InputGroup>
					</Form>

					<Nav className="ms-auto">
						<Nav.Link as={Link} to="cart">
							Cart
						</Nav.Link>
						{user ? (
							<NavDropdown title="UserName" id="collasible-nav-dropdown">
								<NavDropdown.Item as={Link} to="user">
									User Profile
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="orders">
									Order History
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item>Log out</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Nav.Link as={Link} to="login">
								Log in
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default MyNavbar;
