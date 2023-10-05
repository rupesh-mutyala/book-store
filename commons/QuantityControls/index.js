import { useDispatch } from 'react-redux';
import {
	removeItem,
	increaseQuantity,
	decreaseQuantity,
} from '../../store/reducers/cart';
import styles from './styles.module.css';

function QuantityControls({ item, quantity = 0 }) {
	const dispatch = useDispatch();

	return (
		<div className={styles.quantity_controls}>
			<button
				type="button"
				onClick={() => dispatch(decreaseQuantity(item.ISBN))}
				className={styles.quantity_button}
			>
				-
			</button>

			<span className={styles.quantity}>{quantity}</span>

			<button
				type="button"
				onClick={() => dispatch(increaseQuantity(item.ISBN))}
				className={styles.quantity_button}
			>
				+
			</button>

			<button
				type="button"
				onClick={() => dispatch(removeItem(item.ISBN))}
				className={styles.delete_button}
			>
				Remove
			</button>
		</div>
	);
}

export default QuantityControls;
