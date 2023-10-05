import Navbar from '../../commons/Navbar';
import styles from './styles.module.css';

function BookDetails({ data }) {
	const { image = '', author = '', summary = '', title = '' } = data;

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
				</div>
			</div>
		</>
	);
}

export default BookDetails;
