import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Books from '../../../commons/Books';
import toSnakeCase from '../../../utils/toSnakeCase';

function AuthorComponent() {
	const {
		query: { author_id = '' },
	} = useRouter();

	const { data } = useSelector(({ books }) => ({
		data: books || [],
	}));

	const authorBooks = data.filter(
		(item) => toSnakeCase(item.author) === author_id,
	);

	return <Books data={authorBooks} activeTab="author" author_id={author_id} />;
}

export default AuthorComponent;
