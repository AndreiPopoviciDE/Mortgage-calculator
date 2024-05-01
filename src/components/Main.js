import React, { useState } from 'react';

const Main = () => {
  const [data, setData] = useState({
    loanAmount: '',
    interestRate: '',
    lenghtLoan: '',
    mortagePayment: '',
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(data);
    setData({
      ...data,
      mortagePayment: calculateMonthlyPayment(
        data.lenghtLoan,
        data.interestRate,
        data.lenghtLoan
      ),
    });
    console.log(
      calculateMonthlyPayment(
        data.lenghtLoan,
        data.interestRate,
        data.lenghtLoan
      )
    );
    setData({ loanAmount: '', interestRate: '', lenghtLoan: '' });
  }

  function handleInputChange(e, name) {
    setData({ ...data, [name]: e.target.value });
  }

  function calculateMonthlyPayment(
    principal,
    annualInterestRate,
    numberOfPayments
  ) {
    // Convert annual interest rate to decimal form
    let monthlyInterestRate = annualInterestRate / 100 / 12;

    // Calculate the denominator part of the formula
    let denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

    // Calculate the monthly payment
    let monthlyPayment =
      (principal *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      denominator;

    return monthlyPayment;
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <label>
            Principal loan amount
            <input
              required
              type="text"
              value={data.loanAmount}
              onChange={(e) => handleInputChange(e, 'loanAmount')}
            ></input>
            <br />
          </label>
          <label>
            Interest Rate
            <input
              required
              type="text"
              value={data.interestRate}
              onChange={(e) => handleInputChange(e, 'interestRate')}
            ></input>
            <span>%</span>
            <br />
          </label>
          <label>
            Length of loan
            <input
              required
              type="text"
              value={data.lenghtLoan}
              onChange={(e) => handleInputChange(e, 'lenghtLoan')}
            ></input>
            <br />
          </label>
          <br />
          <button type="submit">Calculate</button>
        </form>
      </div>
      <h2>Your monthly mortage payment will be {data.mortagePayment}</h2>
    </>
  );
};

export default Main;
