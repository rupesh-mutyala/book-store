import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import Navbar from '../../commons/Navbar';
import toSnakeCase from '../../utils/toSnakeCase';
import QuantityControls from '../../commons/QuantityControls';
import { addItem } from '../../store/reducers/cart';

function Home() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { data: bookData = [], cartItems = [] } = useSelector(
		({ books, cart }) => ({
			data: books || [],
			cartItems: cart,
		}),
	);

	const featuredBook = bookData[0];

	const {
		title = '',
		author = '',
		summary = '',
		image = '',
		price: { value = 0 } = {},
		ISBN = '',
	} = featuredBook || {};

	const onClickAuthor = () => {
		router.push(`/authors/${toSnakeCase(author)}`);
	};

	const onClickAddToCart = () => {
		dispatch(addItem({ ...featuredBook, quantity: 1 }));
	};

	const isBookedAddedToCart = cartItems.map((item) => item.ISBN).includes(ISBN);

	const { quantity = 0 } = cartItems.find((item) => item.ISBN === ISBN) || {};

	return (
		<>
			<Navbar />

			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Welcome to the Bookstore</h1>
					<p>Your source for the best books!</p>
				</div>

				<div className={styles.featured_book}>
					<div className={styles.book_cover}>
						<img src={image} alt="Featured Book Cover" />
					</div>

					<div className={styles.book_details}>
						<h2>{title}</h2>
						<p
							className={styles.book_author}
							role="presentation"
							onClick={onClickAuthor}
						>
							by {author}
						</p>
						<p className={styles.book_description}>{summary}</p>
						<p className={styles.item_price}>Price: EUR {value}</p>

						{isBookedAddedToCart ? (
							<QuantityControls item={featuredBook} quantity={quantity} />
						) : (
							<button
								onClick={onClickAddToCart}
								type="button"
								className={styles.add_to_cart_button}
							>
								Add to Cart
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
