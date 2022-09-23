export const prices = [
	{
		name: '$1 to $50',
		value: '1-50',
	},
	{
		name: '$51 to $200',
		value: '51-200',
	},
	{
		name: '$201 to $1000',
		value: '201-1000',
	},
	{
		name: 'more than $1000',
		value: '1000-10000',
	},
];

export const ratings = [
	{
		name: '1stars & up',
		rating: 1,
	},
	{
		name: '2stars & up',
		rating: 2,
	},
	{
		name: '3stars & up',
		rating: 3,
	},
	{
		name: '4stars & up',
		rating: 4,
	},
	{
		name: '4stars & up',
		rating: 5,
	},
];

export const getSearchParams = (search) => {
	const sp = new URLSearchParams(search); // /search?category=Shirts
	const category = sp.get('category') || 'all';
	const query = sp.get('query') || 'all';
	const price = sp.get('price') || 'all';
	const rating = sp.get('rating') || 'all';
	const order = sp.get('order') || 'newest';
	const page = sp.get('page') || 1;

	return {
		sp,
		category,
		query,
		price,
		rating,
		order,
		page,
	};
};
