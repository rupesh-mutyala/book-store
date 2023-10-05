import styles from './styles.module.css';
import useHandleSignUpForm from './useHandleSignUpForm';

function SignUpForm({ buttonTitle = '' }) {
	const { errors, handleInputChange, onSubmitForm, INPUT_MAPPING, router } =
		useHandleSignUpForm();

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
					onClick={() => router.push('/login')}
				>
					Already have an Account?
				</div>

				<button className={styles.submit_button} type="submit">
					{buttonTitle}
				</button>
			</div>
		</form>
	);
}

export default SignUpForm;
