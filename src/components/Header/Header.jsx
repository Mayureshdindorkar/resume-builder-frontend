import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from '../../redux/authSlice';
import { setIsUserOldDataLoaded } from '../../redux/resumeSlice';

const Header = () => {

  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);
  const username = useSelector((state) => state.authReducer.username);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setIsUserOldDataLoaded(false));
    navigate('/');
  };

  return (
    <header className={styles.header}>
      {isUserLoggedIn && (
        <div className={styles.userSection}>
          <div className={styles.welcomeMessage}>Welcome '{username}'</div>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-danger"
            style={{ width: '80px', height: '35px', textAlign: 'center', fontSize: '15px', marginTop: '3px', marginBottom: '3px' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      <div className={styles.title}>Resume Builder App</div>
    </header>
  );
};

export default Header;
