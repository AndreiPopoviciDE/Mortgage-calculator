import React from "react";
import styles from "./Button.module.css";

const Button = ({ type, label = "Calculate", disabled }) => {
  return (
    <button type={type} disabled={disabled} className={styles.button}>
      {label}
    </button>
  );
};

export default Button;
