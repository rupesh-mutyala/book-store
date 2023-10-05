import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import Navbar from '../Navbar';
import toStartCase from '../../utils/toStartCase';
import toSnakeCase from '../../utils/toSnakeCase';
import AuthorFilter from '../Filters';
import { addItem, removeItem } from '../../store/reducers/cart';

const truncateDescription = (text, maxWords) => {
	const words = text.split(' ');
	if (words.length > maxWords) {
		return `${words.slice(0, maxWords).join(' ')} ...`;
	}
	return text;
};

function Books({ data = [], activeTab = '', author_id = '' }) {
	const { cartItems } = useSelector(({ cart }) => ({
		cartItems: cart,
	}));

	const dispatch = useDispatch();
	const router = useRouter();

	const [filteredData, setFilteredData] = useState(data);

	const onClickOpenBook = (book_id) => {
		router.push(`/books/${book_id}`);
	};

	const onClickAuthor = (e, author) => {
		e.stopPropagation();
		e.preventDefault();
		router.push(`/authors/${author}`);
	};

	const onClickAddToCart = (bookDetails, isAddedToCart) => {
		if (isAddedToCart) {
			dispatch(removeItem(bookDetails.ISBN));
			return;
		}

		dispatch(addItem({ ...bookDetails, quantity: 1 }));
	};

	useEffect(() => {
		setFilteredData(data);
	}, [data]);

	return (
		<>
			<Navbar />

			<AuthorFilter
				activeTab={activeTab}
				data={data}
				setFilteredData={setFilteredData}
				filteredData={filteredData}
			/>

			{activeTab === 'author' ? (
				<div className={styles.author}>Author: {toStartCase(author_id)}</div>
			) : null}

			<div className={styles.book_list}>
				{filteredData.map((book) => {
					const {
						ISBN = '',
						title = '',
						author = '',
						summary = '',
						image = '',
					} = book;

					const isAddedToCart = cartItems
						.map((item) => item.ISBN)
						.includes(ISBN);

					return (
						<div
							key={ISBN}
							role="presentation"
							onClick={() => onClickOpenBook(ISBN)}
							className={styles.book}
						>
							<img
								src={image}
								alt={`${title} Cover`}
								className={styles.book_cover}
							/>

							<div className={styles.book_details}>
								<h3 className={styles.book_title}>{title}</h3>
								<p
									role="presentation"
									onClick={(e) => onClickAuthor(e, toSnakeCase(author))}
									className={styles.book_author}
								>
									{author}
								</p>
								<p className={styles.book_description}>
									{truncateDescription(summary, 10)}
								</p>

								<div className={styles.footer}>
									<div className={styles.book_price}>
										{book.price.currency} {book.price.value.toFixed(2)}
									</div>

									<button
										type="button"
										className={`${styles.add_to_cart_button} ${
											isAddedToCart && styles.added
										}`}
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
											onClickAddToCart(book, isAddedToCart);
										}}
									>
										{isAddedToCart ? 'Remove from cart' : 'Add to Cart'}
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Books;
