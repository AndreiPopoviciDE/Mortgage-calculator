export function calculateMonthlyPayment(loanAmount, interestRate, lengthLoan) {
  interestRate = interestRate / 100 / 12;
  lengthLoan = lengthLoan * 12;

  var monthlyPayment =
    (loanAmount * interestRate * Math.pow(1 + interestRate, lengthLoan)) /
    (Math.pow(1 + interestRate, lengthLoan) - 1);
  monthlyPayment = +monthlyPayment.toFixed(0);
  return monthlyPayment.toLocaleString('en-US');
}


