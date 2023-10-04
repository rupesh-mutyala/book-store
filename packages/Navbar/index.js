import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.css'; // Import the CSS module styles
import setCookie from '../../utils/setCookie';

function Navbar() {
	const router = useRouter();

	const handleLogout = () => {
		setCookie('loggedIn', 'false', -1);

		// Redirect to the login page.
		router.push('/login');
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.logo}>Book Store</div>

			<ul className={styles.nav_links}>
				<li className={styles.nav_item}>
					<Link href="/">Home</Link>
				</li>
				<li className={styles.nav_item}>
					<Link href="/books">Books</Link>
				</li>
				<li className={styles.nav_item}>
					<Link href="/authors">Authors</Link>
				</li>
			</ul>

			<button
				type="button"
				className={styles.logout_button}
				onClick={handleLogout}
			>
				Logout
			</button>
		</nav>
	);
}

export default Navbar;
