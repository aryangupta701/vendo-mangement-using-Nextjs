import { signIn } from 'next-auth/client';

function LoginSignup() {
  const handleLogin = () => {
    signIn('google');
  };

  return (
    <div>
      <h1>Login/Signup Page</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}

export default LoginSignup;
