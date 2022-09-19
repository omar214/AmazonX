import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import {
	Cart,
	Home,
	Orders,
	Login,
	Signup,
	Product,
	Shipping,
	Payment,
	PlaceOrder,
	Order,
} from './pages';

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
					<Route path="payment" element={<Payment />} />
					<Route path="placeorder" element={<PlaceOrder />} />
					<Route path="orders" element={<Orders />} />
					<Route path="orders/:id" element={<Order />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;