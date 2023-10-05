/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import setCookie from '../../utils/setCookie';

function Navbar() {
	const { cartItems } = useSelector(({ cart }) => ({
		cartItems: cart,
	}));

	const router = useRouter();

	const handleLogout = () => {
		setCookie('loggedIn', 'false', -1);

		// Redirect to the login page.
		router.push('/login');
	};

	return (
		<nav className={styles.navbar}>
			<div
				role="presentation"
				className={styles.logo}
				onClick={() => router.push('/home')}
			>
				Book Store
			</div>

			<ul className={styles.nav_links}>
				<li className={styles.nav_item}>
					<Link href="/home">Home</Link>
				</li>
				<li className={styles.nav_item}>
					<Link href="/books">Books</Link>
				</li>
				<li className={styles.nav_item}>
					<Link href="/authors">Authors</Link>
				</li>
			</ul>

			<div className={styles.flex}>
				<div
					className={styles.cart_icon}
					role="presentation"
					onClick={() => router.push('/cart')}
				>
					<span className={styles.cart_badge}>{cartItems.length}</span>

					<img src="/cart.svg" width={24} height={24} />
				</div>

				<button
					type="button"
					className={styles.logout_button}
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
