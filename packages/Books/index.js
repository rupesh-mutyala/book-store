import data from '../../data';
import styles from './styles.module.css';
import Navbar from '../Navbar';

const truncateDescription = (text, maxWords) => {
	const words = text.split(' ');
	if (words.length > maxWords) {
		return `${words.slice(0, maxWords).join(' ')} ...`;
	}
	return text;
};

function Home() {
	return (
		<>
			<Navbar />

			<div className={styles.container}>
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
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Home;
