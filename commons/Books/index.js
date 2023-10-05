import styles from './styles.module.css';
import Navbar from '../Navbar';
import toStartCase from '../../utils/toStartCase';

const truncateDescription = (text, maxWords) => {
	const words = text.split(' ');
	if (words.length > maxWords) {
		return `${words.slice(0, maxWords).join(' ')} ...`;
	}
	return text;
};

function Books({ data = [], activeTab = '', author_id = '' }) {
	return (
		<>
			<Navbar />

			{activeTab === 'author' ? (
				<div className={styles.author}>Author: {toStartCase(author_id)}</div>
			) : null}

			<div className={styles.book_list}>
				{data.map((book) => {
					const {
						ISBN = '',
						title = '',
						author = '',
						summary = '',
						image = '',
					} = book;

					return (
						<div key={ISBN} className={styles.book}>
							<img
								src={image}
								alt={`${title} Cover`}
								className={styles.book_cover}
							/>

							<div className={styles.book_details}>
								<h3 className={styles.book_title}>{title}</h3>
								<p className={styles.book_author}>{author}</p>
								<p className={styles.book_description}>
									{truncateDescription(summary, 10)}
								</p>

								<div className={styles.footer}>
									<div className={styles.book_price}>
										{book.price.currency} {book.price.value.toFixed(2)}
									</div>

									<button type="button" className={styles.add_to_cart_button}>
										Add to Cart
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
