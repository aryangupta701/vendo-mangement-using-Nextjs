import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from './login.module.css'; 

function LoginSignup() {
    const handleLogin = () => {
        signIn('google');
    };
    const router = useRouter(); 
    const { data, status } = useSession();
    if (status === 'loading') return <h1> loading... please wait</h1>;
    if (status === 'authenticated') {
        router.push('/dashboard'); 
    }
    else return (
        <div className={styles.loginSignupPage}>
        <h1>Login/Signup Page</h1>
        <button className={styles.googleSignInBtn} onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    );
}

export default LoginSignup;


