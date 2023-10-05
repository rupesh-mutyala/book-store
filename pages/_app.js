import React, { useEffect } from 'react';
import './styles.css';
import { useRouter } from 'next/router';
import { Provider, useDispatch } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import getCookieValue from '../utils/getCookieValue';
import store from '../store';
import data from '../data';
import { setBooks } from '../store/reducers/books';
import { setAuthors } from '../store/reducers/authors';
import toSnakeCase from '../utils/toSnakeCase';

const makeStore = () => store; // Function to create the Redux store

const wrapper = createWrapper(makeStore);

function MyApp({ Component, pageProps }) {
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		const isLoggedIn = getCookieValue('loggedIn') === 'true';

		if (!isLoggedIn) {
			router.push('/login');
			return;
		}

		dispatch(setBooks(data));

		const authorsDataObj = data.reduce((acc, cur) => {
			const { author, title, ISBN = '' } = cur;

			const author_id = toSnakeCase(author);

			if (Object.keys(acc).includes(author_id)) {
				return {
					...acc,
					[author_id]: {
						...acc[author_id],
						books: [...acc[author_id].books, { title, id: ISBN }],
					},
				};
			}

			return {
				...acc,
				[author_id]: { author_id, author, books: [{ title, id: ISBN }] },
			};
		}, {});

		const authors_list = Object.values(authorsDataObj);

		dispatch(setAuthors(authors_list));
	}, []);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default wrapper.withRedux(MyApp);
