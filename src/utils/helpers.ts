export function calculateMonthlyPayment(
  loanAmount: number,
  interestRate: number,
  lengthLoan: number
): number {
  const interestRateParsed = interestRate / 100 / 12;
  const lengthLoanParsed = lengthLoan * 12;

  const monthlyPayment =
    (loanAmount *
      interestRateParsed *
      Math.pow(1 + interestRateParsed, lengthLoanParsed)) /
    (Math.pow(1 + interestRateParsed, lengthLoanParsed) - 1);

  return +monthlyPayment.toFixed(0);
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
