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
	AdminProducts,
	AdminProductEdit,
	Dashboard,
} from './pages';

function App() {
	return (
		<PayPalScriptProvider
			deferLoading={true}
			options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}
		>
			<div className="d-flex flex-column body">
				<main>
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
							<Route path="admin/products" element={<AdminProducts />} />
							<Route path="admin/products/:id" element={<AdminProductEdit />} />
							<Route path="admin/dashboard" element={<Dashboard />} />
						</Routes>
					</BrowserRouter>
				</main>
				<footer className="flex-shrink-0 py-4">
					<div className="container text-center">
						All Rights Reserved to{' '}
						<a href="https://github.com/omar214">Omar214</a>
					</div>
				</footer>
			</div>
		</PayPalScriptProvider>
	);
}

export default App;
