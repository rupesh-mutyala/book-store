import { useRouter } from 'next/router';
import styles from './styles.module.css';

function Author({ author }) {
	const router = useRouter();

	const { author_id = '', author: name = '', books = [] } = author;

	const onClickAuthor = () => {
		router.push(`/authors/${author_id}`);
	};

	const onClickBook = (e, id) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/books/${id}`);
	};

	return (
		<div role="presentation" className={styles.author} onClick={onClickAuthor}>
			<h2 className={styles.author_name}>Author: {name}</h2>

			<div className={styles.books}>
				<h3>Books by {name}:</h3>

				<ul className={styles.book_list}>
					{books.map((book) => (
						<li
							key={book.id}
							role="presentation"
							className={styles.book_item}
							onClick={(e) => onClickBook(e, book.id)}
						>
							{book.title}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Author;
