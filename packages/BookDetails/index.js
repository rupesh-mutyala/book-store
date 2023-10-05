import { useDispatch, useSelector } from 'react-redux';
import QuantityControls from '../../commons/QuantityControls';
import Navbar from '../../commons/Navbar';
import styles from './styles.module.css';
import { addItem } from '../../store/reducers/cart';

function BookDetails({ data = {} }) {
	const dispatch = useDispatch();

	const { cartItems = [] } = useSelector(({ cart }) => ({
		cartItems: cart,
	}));

	const {
		image = '',
		author = '',
		summary = '',
		title = '',
		ISBN = '',
		price: { value = 0 } = {},
	} = data || {};

	const onClickAddToCart = () => {
		dispatch(addItem({ ...data, quantity: 1 }));
	};

	const isBookedAddedToCart = cartItems.map((item) => item.ISBN).includes(ISBN);

	const { quantity = 0 } = cartItems.find((item) => item.ISBN === ISBN) || {};

	return (
		<>
			<Navbar />

			<div className={styles.featured_book}>
				<div className={styles.book_cover}>
					<img src={image} alt="Featured Book Cover" />
				</div>

				<div className={styles.book_details}>
					<h2>{title}</h2>
					<p className={styles.book_author}>by {author}</p>
					<p className={styles.book_description}>{summary}</p>
					<p className={styles.item_price}>Price: EUR {value}</p>

					{isBookedAddedToCart ? (
						<QuantityControls item={data} quantity={quantity} />
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
		</>
	);
}

export default BookDetails;
