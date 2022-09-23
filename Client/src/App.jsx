import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
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
	UserProfile,
	Search,
	AdminOrders,
	AdminUsers,
	AdminUserEdit,
} from './pages';

function App() {
	return (
		<PayPalScriptProvider
			deferLoading={true}
			options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}
		>
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
					<Route path="user" element={<UserProfile />} />
					<Route path="orders" element={<Orders />} />
					<Route path="orders/:id" element={<Order />} />
					<Route path="search" element={<Search />} />
					<Route path="admin/orders" element={<AdminOrders />} />
					<Route path="admin/users" element={<AdminUsers />} />
					<Route path="admin/users/:id" element={<AdminUserEdit />} />
					<Route path="admin/products" element={<div> all products </div>} />
					<Route path="admin/dashboard" element={<div> Dashboard </div>} />
				</Routes>
			</BrowserRouter>
		</PayPalScriptProvider>
	);
}

export default App;
