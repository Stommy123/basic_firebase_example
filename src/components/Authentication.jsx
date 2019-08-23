import React, { useState, useEffect, useContext, useCallback } from 'react';
import { auth } from '../firebase';
import { getCurrentUser, getAccessToken } from '../helpers';
import { UserContext } from '../context/UserContext';

const Authentication = _ => {
  const [credentials, setCredentials] = useState({ email: String(), password: String() });
  const { email, password } = credentials;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const getUser = async _ => {
    try {
      const user = await getCurrentUser();
      if (!user) return;
      setUser(user);
      setIsSignedIn(true);
      setCredentials({ email: String(), password: String() });
    } catch (error) {
      console.log('failed to retrieve current user', error);
    }
  };

  const handleSignIn = async _ => {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      if (!user) return;
      const { token } = await getAccessToken();
      sessionStorage.setItem('Auth', `Bearer ${token}`);
      getUser();
    } catch (error) {
      console.log('could not sign in with these credentials', error);
      setIsSignedIn(false);
      setUser({});
    }
  };

  const handleSignUp = async _ => {
    try {
      const { user: newUser } = await auth.createUserWithEmailAndPassword(email, password);
      if (!newUser) return;
      handleSignIn();
    } catch (error) {
      console.log('could not sign up user with these credentials', error);
    }
  };

  const handleSignOut = async _ => {
    await auth.signOut();
    sessionStorage.removeItem('Auth');
    setIsSignedIn(false);
    setUser({});
  };

  const handleInputChange = field => e => setCredentials({ ...credentials, [field]: e.target.value });

  const mountEffect = useCallback(getUser, []);

  useEffect(
    _ => {
      mountEffect();
    },
    [mountEffect]
  );

  return (
    <div>
      <h1>Firebase Auth Example</h1>
      <p>{isSignedIn ? `Current User: ${user.email}` : 'Please sign in'}</p>
      <input type="text" placeholder="email" value={email} onChange={handleInputChange('email')} />
      <input type="text" placeholder="password" value={password} onChange={handleInputChange('password')} />
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignUp}>Signup</button>
      <button onClick={handleSignOut}>Sign out</button>
      <button onClick={getUser}>Get User</button>
    </div>
  );
};

export default Authentication;
