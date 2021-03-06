import { useState } from 'react';
import { signUp, signIn } from './services/fetch-utils';
import { useDataContext } from './ContextProvider';

export default function AuthPage() {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const { setUser } = useDataContext();

  async function handleSignIn(e) {
    e.preventDefault();
    const user = await signIn(signInEmail, signInPassword);
    setUser(user);
  }
  async function handleSignUp(e) {
    e.preventDefault();
    const user = await signUp(signUpEmail, signUpPassword);
    setUser(user);
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSignUp}>
        <div className="sign-up">
          <h3>SignUp</h3>
          <label>
          Email
            <input
              onChange={(e) => setSignUpEmail(e.target.value)}
              value={signUpEmail}
              type="email"
            />
          </label>
          <label>
          Password
            <input
              onChange={(e) => setSignUpPassword(e.target.value)}
              value={signUpPassword}
              type="password"
            />
          </label>
          <button>SignUp</button>
        </div>
      </form>
      <form onSubmit={handleSignIn}>
        <div className="sign-in">
          <h3>SignIn</h3>
          <label>
          Email
            <input
              onChange={(e) => setSignInEmail(e.target.value)}
              value={signInEmail}
              type="email"
            />
          </label>
          <label>
          Password
            <input
              onChange={(e) => setSignInPassword(e.target.value)}
              value={signInPassword}
              type="password"
            />
          </label>
          <button>SignIn</button>
        </div>
      </form>
    </div>
  );
}
