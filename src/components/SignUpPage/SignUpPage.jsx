import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../redux/authSlice';
import { Link } from 'react-router-dom';
import styles from './signUpPage.module.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserSignedUp = useSelector((state) => state.authReducer.isUserSignedUp);

  useEffect(() => {
    if (isUserSignedUp === true) {
      navigate('/');
    }
  }, [isUserSignedUp, navigate]);

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup({ username, password }));
  };

  return (
    <div className={styles.authContainer}>
      <h2>SignUp</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>

        <div className={styles.centerLink}>
          <Link to="/">Login</Link>
        </div>

      </form>
    </div>
  );
};

export default SignupPage;
