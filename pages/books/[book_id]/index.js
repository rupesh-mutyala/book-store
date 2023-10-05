import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import BookDetails from '../../../packages/BookDetails';

function BookComponent() {
	const {
		query: { book_id = '' },
	} = useRouter();

	const { data = [] } = useSelector(({ books }) => ({
		data: books || [],
	}));

	const bookDetails = data.find((item) => item.ISBN.toString() === book_id);

	return <BookDetails data={bookDetails} />;
}

export default BookComponent;
