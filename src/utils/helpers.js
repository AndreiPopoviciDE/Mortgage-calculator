export function calculateMonthlyPayment(loanAmount, interestRate, lengthLoan) {
  // FEEDBACK: do not modify function arguments
  // imutabiliyt - pure functions - easier to test - side effect
  interestRate = interestRate / 100 / 12;
  const lengthLoanParsed = lengthLoan * 12;

  // red flag
  let monthlyPayment =
    (loanAmount * interestRate * Math.pow(1 + interestRate, lengthLoan)) /
    (Math.pow(1 + interestRate, lengthLoan) - 1);
    
  monthlyPayment = +monthlyPayment.toFixed(0);

  return monthlyPayment.toLocaleString('en-US');
}

// SOLID - Single responsibility principle

// format function
export function formatCurrency(value) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}


