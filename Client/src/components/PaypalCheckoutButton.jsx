import { CircularProgress } from '@mui/material';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import API from '../api/api.js';
import { toast } from 'react-toastify';

const PaypalCheckoutButton = ({ totalPrice, orderId, setOrderDetails }) => {
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

	const createOrder = async (data, actions) => {
		return actions.order
			.create({
				purchase_units: [
					{
						description: 'order Desc',
						amount: {
							value: totalPrice,
						},
					},
				],
			})
			.then((orderID) => {
				toast.dismiss();
				toast.success('Order Paid Successfully');
				return orderID;
			});
	};

	const onApprove = async (data, actions) => {
		try {
			const { data: res } = await API.put(`/orders/${orderId}/pay`);
			setOrderDetails((prev) => ({ ...prev, isPaid: true }));
			console.log(res);
		} catch (err) {
			console.log(err);
			// 	toast.error(getError(err));
		}
	};
	function onError(err) {
		console.log(err);
		toast.dismiss();
		toast.error('error while paying Order');
		// toast.error(getError(err));
	}

	useEffect(() => {
		const loadPaypalScript = async () => {
			const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
			paypalDispatch({
				type: 'resetOptions',
				value: {
					'client-id': clientId,
					currency: 'USD',
				},
			});
			paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
		};
		loadPaypalScript();
	}, [paypalDispatch]);
	return (
		<>
			{isPending ? (
				<CircularProgress />
			) : (
				<PayPalButtons
					createOrder={createOrder}
					onApprove={onApprove}
					onError={onError}
				/>
			)}
		</>
	);
};

export default PaypalCheckoutButton;
