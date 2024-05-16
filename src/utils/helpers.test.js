import { calculateMonthlyPayment, formatCurrency } from './helpers';

describe('calculateMonthlyPayment function', () => {
  test('should calculate monthly payment correctly for a 30-year loan', () => {
    // Arrange
    const loanAmount = 500000;
    const interestRate = 3;
    const lengthLoan = 30;

    // Act
    const result = calculateMonthlyPayment(
      loanAmount,
      interestRate,
      lengthLoan
    );

    // Assert
    expect(result).toBe(2108);
  });
});

describe('formatCurrency function', () => {
  test('should format positive value correctly', () => {
    // Arrange
    const value = 1000;

    // Act
    const result = formatCurrency(value);

    // Assert
    expect(result).toBe('$1,000.00'); // Ensure correct formatting for positive value
  });

  test('should format negative value correctly', () => {
    // Arrange
    const value = -5000;

    // Act
    const result = formatCurrency(value);

    // Assert
    expect(result).toBe('-$5,000.00');
  });

  test('should format zero value correctly', () => {
    // Arrange
    const value = 0;

    // Act
    const result = formatCurrency(value);

    // Assert
    expect(result).toBe('$0.00');
  });
});
