import React, { useState } from "react";
import Button from "../UI/Button";
import styles from "./Main.module.css";
import { calculateMonthlyPayment } from "../utils/helpers.js";

// const should be taken out of the component
const requiredFields = ["loanAmount", "interestRate", "lengthLoan"];

const Main = () => {
  // SOLID: Interface Segregation Principle (ISP)
  // Discussion: Is better to split the state into multiple states to avoid unnecessary re-renders
  const [data, setData] = useState({
    loanAmount: "",
    interestRate: "",
    lengthLoan: "",
    mortagePayment: "",
  });

  const [warnings, setWarnings] = useState({});

  const isSubmitDisabled =
    requiredFields.some((key) => data[key].trim() === "") ||
    Object.values(warnings).some((warning) => warning !== "");

  function handleFormSubmit(e) {
    e.preventDefault();
    // fake api request
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
    // FEEDBACK: setData should not be updated if the input is invalid
    if (!/^\d*\.?\d*$/.test(e.target.value.trim())) {
      setWarnings({ ...warnings, [name]: "Please enter only numbers." });
    } else {
      setWarnings({ ...warnings, [name]: "" });

      setData({ ...data, [name]: e.target.value.trim() });
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} className={styles.mortgageForm}>
          <div>
            <label className={styles.formLabel}>Principal loan amount</label>
            <input
              className={styles.input}
              required
              type="text"
              value={data.loanAmount}
              onChange={(e) => handleInputChange(e, "loanAmount")}
            ></input>
            {warnings.loanAmount && (
              <p className={styles.warnings} aria-errormessage="">
                {warnings.loanAmount}
              </p>
            )}
          </div>

          <label>
            Interest rate
            <br />
            <input
              className={styles.input}
              required
              type="text"
              value={data.interestRate}
              onChange={(e) => handleInputChange(e, "interestRate")}
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
              onChange={(e) => handleInputChange(e, "lengthLoan")}
            ></input>
            <span> Years</span>
            <p className={styles.warnings}>{warnings.lengthLoan}</p>
          </label>
          <div>
            <Button
              type="submit"
              label="Calculate"
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
