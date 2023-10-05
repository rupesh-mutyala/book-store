import { useRouter } from 'next/router';
import { useState } from 'react';

const INPUT_MAPPING = [
	{
		type: 'text',
		id: 'name',
		name: 'name',
		label: 'Name',
	},
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

const useHandleSignUpForm = () => {
	const router = useRouter();

	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		name: '',
		username: '',
		password: '',
	});

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

		if (storedUsers.some((user) => user.username === formData.username)) {
			alert('Username already exists. Please choose another.');
			return;
		}

		localStorage.setItem('users', JSON.stringify([...storedUsers, formData]));
		router.push('/login');
	};

	return {
		errors,
		handleInputChange,
		onSubmitForm,
		INPUT_MAPPING,
		router,
	};
};

export default useHandleSignUpForm;
