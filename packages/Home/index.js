import data from '../../data';
import styles from './styles.module.css';
import Navbar from '../Navbar';

function Home() {
	const featuredBook = data[0];

	const { title = '', author = '', summary = '', image = '' } = featuredBook;

	return (
		<>
			<Navbar />

			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Welcome to the Bookstore</h1>
					<p>Your source for the best books!</p>
				</div>

				<section className={styles.featured_book}>
					<div className={styles.book_cover}>
						<img src={image} alt="Featured Book Cover" />
					</div>

					<div className={styles.book_details}>
						<h2>{title}</h2>
						<p className={styles.book_author}>{author}</p>
						<p className={styles.book_description}>{summary}</p>
					</div>
				</section>
			</div>
		</>
	);
}

export default Home;
