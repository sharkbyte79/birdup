import { FirebaseError } from 'firebase/app';
import { User as FirebaseUser, UserCredential, AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";


export default function SignIn() {
  const navigate: NavigateFunction = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const handleEmailSignIn = async (e: FormEvent) => {
    // Prevent page reload on form submission
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
            setError("Incorrect username or password");
            break;
          case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
            setError("Too many attempts. Please try again later.");
            break;
          case AuthErrorCodes.INVALID_EMAIL:
            setError("Please provide a valid email address.");
            break;
          default:
            setError("We encountered an issue signing in. Please try again.");
            break;
        }
      }
      else {
        setError("We encountered an internal service error. Please try again.");
      }
    }
    finally {
      setLoading(false);
    }
  }

  // TODO proper ui with prettier error display
  return (
    <>
      {error &&
        <p>{error}</p>
      }
      <form onSubmit={handleEmailSignIn}>
        <input
          type="text"
          id="signup-email-input"
          value={email}
          placeholder={"Enter your email address"}
          onChange={((e) => {
            setEmail(e.target.value);
          })}
          disabled={loading}
          required
        />
        <input
          type="password"
          id="signup-password-input"
          value={password}
          placeholder={"Choose your password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>Sign in</button>
      </form>
    </>
  );
}
