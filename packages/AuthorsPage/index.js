import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import Navbar from '../../commons/Navbar';
import Author from './Author';

function AuthorsPage() {
	const { data } = useSelector(({ authors }) => ({
		data: authors || [],
	}));

	return (
		<>
			<Navbar />

			<div className={styles.authors_list}>
				<h2 className={styles.title}>Authors</h2>

				<div className={styles.author_container}>
					{data.map((author) => (
						<Author key={author.author_id} author={author} />
					))}
				</div>
			</div>
		</>
	);
}

export default AuthorsPage;
