import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { Cart, Home, Orders, Login, Signup, Product, Shipping } from './pages';

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route index element={<Home />} />
					<Route path="products/:id" element={<Product />} />
					<Route path="cart" element={<Cart />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Signup />} />
					<Route path="shipping" element={<Shipping />} />
					<Route path="orders" element={<Orders />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
