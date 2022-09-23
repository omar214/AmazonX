import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Review } from '../components';
import Button from 'react-bootstrap/Button';
import { Product } from '../components';
import API from '../api/api.js';
import { CircularProgress } from '@mui/material';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { prices, ratings, getSearchParams } from '../utils/searchUtils.js';

const Search = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const [categories, setCategories] = useState([]);
	const [numPages, setNumPages] = useState(0);
	const [products, setProducts] = useState({
		items: [],
		loading: false,
		error: false,
	});
	const { category, query, price, rating, order, page } =
		getSearchParams(search);

	useEffect(() => {
		const fecthProducts = async () => {
			setProducts((prev) => ({ ...prev, loading: true }));
			try {
				const { data: res } = await API.get(
					`/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`,
				);
				setProducts({ loading: false, error: false, items: res.products });
				setNumPages(res.pages);
			} catch (error) {
				setProducts((prev) => ({ ...prev, loading: false, error: true }));
				console.log(error.message);
			}
		};

		fecthProducts();
	}, [page, query, category, price, rating, order]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const { data: res } = await API.get(`/products/categories`);
				setCategories(res.categories);
			} catch (err) {
				console.log(err);
			}
		};
		fetchCategories();
	}, []);

	const formatFilterUrl = (filter) => {
		const filterPage = filter.page || page;
		const filterCategory = filter.category || category;
		const filterQuery = filter.query || query;
		const filterRating = filter.rating || rating;
		const filterPrice = filter.price || price;
		const sortOrder = filter.order || order;
		return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
	};
	return (
		<Container>
			<Row>
				<Col md={3}>
					<h3>Categories</h3>
					<div>
						<ul>
							<li>
								<Link
									className={'all' === category ? 'fw-bold' : ''}
									to={formatFilterUrl({ category: 'all' })}
								>
									Any
								</Link>
							</li>
							{categories.map((c, idx) => (
								<li key={idx}>
									<Link
										className={c === category ? 'fw-bold' : ''}
										to={formatFilterUrl({ category: c })}
									>
										{c}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3>Price</h3>
						<ul>
							<li>
								<Link
									className={'all' === price ? 'fw-bold' : ''}
									to={formatFilterUrl({ price: 'all' })}
								>
									Any
								</Link>
							</li>
							{prices.map((p, idx) => (
								<li key={idx}>
									<Link
										to={formatFilterUrl({ price: p.value })}
										className={p.value === price ? 'fw-bold' : ''}
									>
										{p.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3>Avg. Customer Review</h3>
						<ul>
							{ratings.map((r, idx) => (
								<li key={idx}>
									<Link
										to={formatFilterUrl({ rating: r.rating })}
										className={`${r.rating}` === `${rating}` ? 'fw-bold' : ''}
									>
										<Review rating={r.rating} numReviews={-1} />
										<span className="text-primary"> & UP</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</Col>
				<Col md={9}>
					{products.loading ? (
						<CircularProgress />
					) : products.error ? (
						<Alert variant="danger">Error While fetching products</Alert>
					) : (
						<>
							<Row className="justify-content-between mb-3">
								<Col md={6}>
									<div>
										<span className="text-secondary">
											{products.items.length === 0
												? 'No'
												: products.items.length}{' '}
											Results
										</span>
										{query !== 'all' && ' : ' + query}
										{category !== 'all' && ' : ' + category}
										{price !== 'all' && ' : Price ' + price}
										{rating !== 'all' && ' : Rating ' + rating + ' & up'}
										{query !== 'all' ||
										category !== 'all' ||
										rating !== 'all' ||
										price !== 'all' ? (
											<Button
												variant="light"
												size="sm"
												onClick={() => navigate('/search')}
											>
												<CancelSharpIcon />
											</Button>
										) : null}
									</div>
								</Col>
								<Col className="text-end">
									Sort by{' '}
									<select
										value={order}
										onChange={(e) => {
											navigate(formatFilterUrl({ order: e.target.value }));
										}}
									>
										<option value="newest">Newest Arrivals</option>
										<option value="lowest">Price: Low to High</option>
										<option value="highest">Price: High to Low</option>
										<option value="toprated">Avg. Customer Reviews</option>
									</select>
								</Col>
							</Row>
							{products.items.length === 0 ? (
								<Alert varient="info">No Product Found</Alert>
							) : (
								<Row>
									{products.items.map((p, idx) => (
										<Col sm={4} lg={3} className="mb-3" key={idx}>
											<Product p={p} />
										</Col>
									))}
								</Row>
							)}

							<div>
								{numPages > 1 &&
									[...Array(numPages).keys()].map((x) => (
										<Button
											className={Number(page) === x + 1 ? 'fw-bold' : ''}
											variant="light"
											key={x}
											as={Link}
											to={formatFilterUrl({ page: x + 1 })}
										>
											{x + 1}
										</Button>
									))}
							</div>
						</>
					)}
				</Col>
			</Row>
		</Container>
	);
};
export default Search;
