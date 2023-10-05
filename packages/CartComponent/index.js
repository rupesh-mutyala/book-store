import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Navbar from '../../commons/Navbar';
import styles from './styles.module.css';
import QuantityControls from '../../commons/QuantityControls';

function CartComponent() {
	const router = useRouter();

	const { cartItems = [] } = useSelector(({ cart }) => ({
		cartItems: cart,
	}));

	const onClickBook = (book_id) => {
		router.push(`/books/${book_id}`);
	};

	const totalPrice = cartItems.reduce(
		(acc, item) => acc + item.price.value * item.quantity,
		0,
	);

	return (
		<>
			<Navbar />

			<div className={styles.cart_container}>
				<h2 className={styles.cart_title}>Your Cart</h2>

				<p className={styles.total_price}>
					Total Landing Cost: EUR {totalPrice.toFixed(2)}
				</p>

				<div className={styles.cart_items}>
					{cartItems.map((item) => {
						const {
							ISBN = '',
							image = '',
							title = '',
							price: { value = 0 },
							quantity = 0,
						} = item;

						return (
							<div key={ISBN} className={styles.cart_item}>
								<img
									src={image}
									alt={item.name}
									className={styles.item_image}
									role="presentation"
									onClick={() => onClickBook(ISBN)}
								/>

								<div className={styles.item_details}>
									<h3
										role="presentation"
										className={styles.item_name}
										onClick={() => onClickBook(ISBN)}
									>
										{title}
									</h3>

									<p className={styles.item_price}>Price: EUR {value}</p>

									<QuantityControls item={item} quantity={quantity} />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default CartComponent;
