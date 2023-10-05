import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import Navbar from '../../commons/Navbar';
import toSnakeCase from '../../utils/toSnakeCase';

function Home() {
	const router = useRouter();
	const { data } = useSelector(({ books }) => ({
		data: books || [],
	}));

	const featuredBook = data[0];

	const { title = '', author = '', summary = '', image = '' } = featuredBook;

	const onClickAuthor = () => {
		router.push(`/authors/${toSnakeCase(author)}`);
	};

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
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
