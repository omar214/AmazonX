import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Button from 'react-bootstrap/Button';
import API from '../api/api.js';
import { toast } from 'react-toastify';
const KEY = process.env.REACT_APP_STRIPE_CLIENT_ID;

const StripeCheckoutButton = ({ totalPrice, orderId, setOrderDetails }) => {
	const [stripeToken, setStripeToken] = useState(null);
	const onToken = (token) => {
		setStripeToken(token);
	};
	useEffect(() => {
		const makeRequest = async () => {
			try {
				const { data: res } = await API.post(`/orders/${orderId}/stripe`, {
					tokenId: stripeToken.id,
					amount: totalPrice * 100,
				});
				console.log(res);
				toast.success('Paid Successfully');
				setOrderDetails((prev) => ({
					...prev,
					isPaid: true,
				}));
			} catch (err) {
				console.log(err);
				toast.error(err);
			}
		};
		stripeToken && makeRequest();
	}, [stripeToken, orderId, totalPrice]);

	return (
		<StripeCheckout
			name="Amazon Store"
			image="https://cdn.iconscout.com/icon/free/png-256/amazon-1869030-1583154.png"
			description={`Your total is ${totalPrice * 100}`}
			amount={totalPrice * 100}
			token={onToken}
			stripeKey={KEY}
		>
			<Button variant="success" className="container-fluid">
				CHECKOUT NOW
			</Button>
		</StripeCheckout>
	);
};

export default StripeCheckoutButton;
