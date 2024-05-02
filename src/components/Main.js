import React, { useState } from 'react';
import Button from '../UI/Button';
import styles from './Main.module.css';
import { calculateMonthlyPayment } from '../utils/helpers.js';

const Main = () => {
  const [data, setData] = useState({
    loanAmount: '',
    interestRate: '',
    lengthLoan: '',
    mortagePayment: '',
  });
  const [warnings, setWarnings] = useState({});

  const requiredFields = ['loanAmount', 'interestRate', 'lengthLoan'];

  const isSubmitDisabled =
    requiredFields.some((key) => data[key].trim() === '') ||
    Object.values(warnings).some((warning) => warning !== '');

  function handleFormSubmit(e) {
    e.preventDefault();

    setData({
      mortagePayment: calculateMonthlyPayment(
        data.loanAmount,
        data.interestRate,
        data.lengthLoan
      ),
      loanAmount: data.loanAmount,
      interestRate: data.interestRate,
      lengthLoan: data.lengthLoan,
    });
  }

  function handleInputChange(e, name) {
    setData({ ...data, [name]: e.target.value.trim() });

    if (!/^\d*\.?\d*$/.test(e.target.value.trim())) {
      setWarnings({ ...warnings, [name]: 'Please enter only numbers.' });
    } else {
      setWarnings({ ...warnings, [name]: '' });
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <label className={styles.input}>
            Principal loan amount
            <br />
            <input
              className={styles.input}
              required
              type="text"
              value={data.loanAmount}
              onChange={(e) => handleInputChange(e, 'loanAmount')}
            ></input>
            <p className={styles.warnings}>{warnings.loanAmount}</p>
          </label>

          <label>
            Interest rate
            <br />
            <input
              className={styles.input}
              required
              type="text"
              value={data.interestRate}
              onChange={(e) => handleInputChange(e, 'interestRate')}
            ></input>
            <span> %</span>
            <p className={styles.warnings}>{warnings.interestRate}</p>
          </label>
          <label>
            Length of loan
            <br />
            <input
              className={styles.input}
              required
              type="text"
              value={data.lengthLoan}
              onChange={(e) => handleInputChange(e, 'lengthLoan')}
            ></input>
            <span> Years</span>
            <p className={styles.warnings}>{warnings.lengthLoan}</p>
          </label>
          <div>
            <Button
              type="submit"
              title="Calculate"
              disabled={isSubmitDisabled}
            />
            <p>Your monthly mortgage payment will be ${data.mortagePayment}</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Main;
