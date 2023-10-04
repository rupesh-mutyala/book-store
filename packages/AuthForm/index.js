import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	login: LoginForm,
	signup: SignUpForm,
};

function AuthForm({ activeTab = '' }) {
	const buttonTitle = activeTab === 'login' ? 'Log In' : 'Sign Up';

	const ActiveComponent = COMPONENT_MAPPING[activeTab];

	return (
		<div className={styles.container}>
			<div className={styles.form_container}>
				<h2 className={styles.title}>{buttonTitle}</h2>

				<ActiveComponent buttonTitle={buttonTitle} />
			</div>
		</div>
	);
}

export default AuthForm;
