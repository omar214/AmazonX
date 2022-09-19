const handleRouteError = (err, req, res, next) => {
	const status = err.status ?? 500;
	const message = err.message ?? 'Something went wrong!';
	return res.status(status).json({
		success: false,
		status,
		message,
	});
};

// handle not found routes
const handleNotFound = (req, res) => {
	res.status(404);
	res.json({
		error: {
			message: 'this route is not found',
		},
	});
};

export { handleNotFound, handleRouteError };
