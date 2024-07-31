import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import { Link } from 'react-router-dom';
import styles from './loginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);
  const isUserOldDataLoaded = useSelector((state) => state.resumeReducer.isUserOldDataLoaded);
  let error = useSelector((state) => state.authReducer.error);

  useEffect(() => {
    if (isUserLoggedIn && isUserOldDataLoaded) {
      navigate('/create-resume/personal-details');
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
    </div>
  );
};

export default LoginPage;
