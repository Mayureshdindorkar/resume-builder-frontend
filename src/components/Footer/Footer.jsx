import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Made with <span style={{ color: 'red' }}>❤️</span> by Mayuresh Dindorkar</p>
    </footer>
  );
};

export default Footer;