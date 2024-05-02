import React from 'react';
import styles from './Button.module.css'
const Button = ({ type, title = 'Calculate',disabled }) => {
  return <button type={type} disabled={disabled} className={styles.button}>{title}</button>;
};

export default Button;
