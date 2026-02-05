import { FirebaseError } from 'firebase/app';
import { User as FirebaseUser, UserCredential, AuthErrorCodes } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { BirdupResponse } from '../services/apiClient';
import { createUser } from '../services/user';
import type { User } from '../types/shared.types';

export default function Signup() {
  const navigate: NavigateFunction = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const handleEmailSignUp = async (e: FormEvent) => {
    // Prevent page reload on form submission
    e.preventDefault();
    setError(null);
    setLoading(true);

    let firebaseUser: FirebaseUser | null = null;
    try {
      // Register a new Firebase user and store a new User record
      const userCred: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      firebaseUser = userCred.user;

      const createUserRes: BirdupResponse<User> = await createUser({
        firebaseID: firebaseUser.uid,
        email: firebaseUser.email!
      });

      if (createUserRes.status !== 201) {
        throw new Error("failed to insert New user record");
      }

      console.log(`created a new user ${firebaseUser.uid}`);

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case AuthErrorCodes.WEAK_PASSWORD:
            setError("Your password must be at least 6 characters long.");
            break;
          case AuthErrorCodes.NEED_CONFIRMATION:
          case AuthErrorCodes.EMAIL_EXISTS:
            setError("This email address is already in use.");
            break;
          case AuthErrorCodes.INVALID_EMAIL:
            setError("Please provide a valid email address.");
            break;
          default:
            setError("We encountered an issue creating your account. Please try again.");
            break;
        }
      }
      else {
        if (firebaseUser) { await firebaseUser.delete(); }
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
      <form onSubmit={handleEmailSignUp}>
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
        <button type="submit" disabled={loading}>Create Account</button>
      </form>
    </>
  );
}
