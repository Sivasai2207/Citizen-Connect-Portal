/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import React, { useRef, useMemo, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import Loader from '../Helpers/Loader';
import { auth, db } from '../firebase/firebase';

export const AuthContext = React.createContext();

const emails = [
  'admin@connect.com',
  'water@connect.com',
  'road@connect.com',
  'railways@connect.com',
  'electricity@connect.com',
  'eduction@connect.com',
  'medical@connect.com',
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [testUser, setTestUser] = useState(null);

  const timeout = useRef();

  async function login({ email, password }) {
    try {
      if (!emails.includes(email)) throw new Error('User not found');
      if (password.length <= 6) throw new Error('Password should be at least 6 characters');
      const theUser = await signInWithEmailAndPassword(auth, email, password);
      if (theUser) {
        navigate('/');
      }
      return true;
    } catch (err) {
      const msg = handleFirebaseError(err);
      setErrorMessage(msg);
      return false;
    }
  }

  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log('Sign Out Sucessfull');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (theUser) => {
      if (theUser != null) {
        setIsAuthenticated(true);
        setUser(theUser);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log('😢 We are not authenticated!');
      }
      setIsLoading(false);
    });
    return () => {
      subscription();
      clearTimeout(timeout.current);
    };
  }, []);

  const setErrorMessage = (err) => {
    setError(err);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    const querySnapshot = collection(db, 'posts');

    const unsub = onSnapshot(querySnapshot, (snapshot) => {
      const theposts = [];
      snapshot.forEach((doc) => {
        theposts.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setPosts(theposts);
    });
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const notificationsRef = collection(db, 'notifications');
    const notificationsQuery = query(notificationsRef, orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(notificationsQuery, (snapshot) => {
      const theposts = [];
      snapshot.forEach((doc) => {
        theposts.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setNotifications(theposts);
    });
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const authContextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      signOutUser,
      login,
      error,
      setErrorMessage,
      setTestUser,
      testUser,
      posts: !user?.email.includes('admin')
        ? posts.filter((post) => {
            if (user?.email.includes(post.department.toLowerCase())) {
              return true;
            }

            return false;
          })
        : posts,
      notifications: !user?.email.includes('admin')
        ? notifications.filter((notification) => {
            if (user?.email.includes(notification.department.toLowerCase())) {
              return true;
            }

            return false;
          })
        : notifications,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isAuthenticated, error, posts, notifications]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};
const handleFirebaseError = (error) => {
  let msg = error.message;
  if (msg.includes('auth/email-already-in-use')) {
    msg = 'Email already in use';
  } else if (msg.includes('auth/invalid-email')) {
    msg = 'Invalid email';
  } else if (msg.includes('auth/weak-password')) {
    msg = 'Password should be at least 6 characters';
  } else if (msg.includes('auth/user-not-found')) {
    msg = 'User not found';
  } else if (msg.includes('auth/wrong-password')) {
    msg = 'Wrong password';
  } else if (msg.includes('auth/too-many-requests')) {
    msg = 'Too many requests, please try again later';
  } else if (msg.includes('auth/network-request-failed')) {
    msg = 'Network request failed, please try again later';
  } else if (msg.includes('auth/invalid-credential')) {
    msg = 'Invalid Credentials';
  }
  return msg;
};
