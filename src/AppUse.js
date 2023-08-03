import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import App from './App';
import { setIsAuthenticated } from './redux/userslice';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AppT from './AppT';
import AppA from './AppA';

function AppUse() {
  const { currentUser, isAuthenticated } = useSelector(state => state.user);
  const [useres, setuseres] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://jami3aty-api.onrender.com/api/users/find/${currentUser}`);
        setuseres(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [currentUser]);

  const id_user = useSelector(state => state.user.id_user);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      dispatch(setIsAuthenticated(true));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('token', 'access_token');
    } else {
      localStorage.removeItem('token');
    }
  }, [isAuthenticated]);

  // Check if useres is null before accessing its properties
  if (!useres) {
    return <div>Loading...</div>;
  }

  // Now you can safely access useres properties
  return (
    <>
      {useres.role === 'teacher' ? (
        <AppT id_user={id_user} />
      ) : useres.role === 'admin' ? (
        <AppA />
      ) : (
        <App />
      )}
    </>
  );
}

export default AppUse;
