import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './styles.module.css';
import setCookie from '../../utils/setCookie';

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

function LoginForm({ buttonTitle = '' }) {
	const router = useRouter();

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

			router.push('/home');
		} else {
			alert('Invalid credentials. Please try again.');
		}
	};

	return (
		<form
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault();
				onSubmitForm();
			}}
		>
			{INPUT_MAPPING.map((item) => {
				const { label, ...restProps } = item;

				const { name, id } = restProps;

				return (
					<div key={id} className={styles.form_group}>
						<div className={styles.label}>{label}</div>

						<input
							className={styles.input}
							onChange={handleInputChange}
							{...restProps}
						/>

						{errors[name] ? (
							<div className={styles.error}>{errors[name]}</div>
						) : null}
					</div>
				);
			})}

			<div className={styles.button_container}>
				<div
					role="presentation"
					className={styles.register_button}
					onClick={() => router.push('/signup')}
				>
					Create a New Account
				</div>

				<button className={styles.submit_button} type="submit">
					{buttonTitle}
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
