import { useSelector } from 'react-redux';
import Books from '../../commons/Books';

function BooksList() {
	const { data } = useSelector(({ books }) => ({
		data: books || [],
	}));

	return <Books data={data} />;
}

export default BooksList;
