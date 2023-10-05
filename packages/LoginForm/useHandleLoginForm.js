import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import data from '../../data';
import setCookie from '../../utils/setCookie';
import { setBooks } from '../../store/reducers/books';
import toSnakeCase from '../../utils/toSnakeCase';
import { setAuthors } from '../../store/reducers/authors';

const INPUT_MAPPING = [
	{
		type: 'text',
		id: 'username',
		name: 'username',
		label: 'Username',
	},
	{
		type: 'password',
		id: 'password',
		name: 'password',
		label: 'Password',
	},
];

const useHandleLoginForm = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({ username: '', password: '' });

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmitForm = () => {
		const errorsPresent = Object.entries(formData).reduce(
			(acc, [key, value]) => {
				if (!value) {
					return { ...acc, [key]: `${key} is required` };
				}

				return acc;
			},
			{},
		);

		setErrors(errorsPresent);

		if (Object.keys(errorsPresent).length) {
			return;
		}

		const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

		const storedUsers = [
			{
				name: 'user one',
				username: 'user_one@gmail.com',
				password: 'user_one',
			},
			...savedUsers,
		];

		const user = storedUsers.find(
			(userObj) =>
				userObj.username === formData.username &&
				userObj.password === formData.password,
		);

		if (user) {
			setCookie('loggedIn', true, 1);

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

			router.push('/home');
		} else {
			alert('Invalid credentials. Please try again.');
		}
	};

	return {
		INPUT_MAPPING,
		onSubmitForm,
		handleInputChange,
		errors,
		router,
	};
};

export default useHandleLoginForm;
