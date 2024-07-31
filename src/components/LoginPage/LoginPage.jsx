import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './loginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);
  const isUserOldDataLoaded = useSelector((state) => state.resumeReducer.isUserOldDataLoaded);
  const error = useSelector((state) => state.authReducer.error);

  useEffect(() => {
    console.log('isUserLoggedIn:', isUserLoggedIn);
    console.log('isUserOldDataLoaded:', isUserOldDataLoaded);

    if (isUserLoggedIn && isUserOldDataLoaded) {
      toast.success('Login successful!', {
        className: styles.customToast,
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/create-resume/personal-details');
      }, 1500); // Delay navigation by 1.5 seconds to show the toast
    }
  }, [isUserLoggedIn, isUserOldDataLoaded, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className={styles.authContainer}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit">Login</button>

        <div className={styles.centerLink}>
          <Link to="/signup">SignUp</Link>
        </div>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  )
};

export default LoginPage;
