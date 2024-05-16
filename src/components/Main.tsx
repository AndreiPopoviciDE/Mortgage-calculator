import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';
import { calculateMonthlyPayment, formatCurrency } from '../utils/helpers';

interface FormData {
  loanAmount: string;
  interestRate: string;
  lengthLoan: string;
  mortgagePayment: string;
}

const requiredFields: (keyof FormData)[] = [
  'loanAmount',
  'interestRate',
  'lengthLoan',
];

const MainWrapper = styled.div`
  background-color: white;
  width: 680px;
  font-size: 30px;
  text-align: left;
  padding: 30px;
  margin-top: 50px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 20px;
  width: 350px;
`;

const Unit = styled.span`
  margin-left: 10px;
`;

const Warnings = styled.p`
  height: 20px;
  font-size: 15px;
  color: red;
`;

const Main: React.FC = () => {
  const [data, setData] = useState<FormData>({
    loanAmount: '',
    interestRate: '',
    lengthLoan: '',
    mortgagePayment: '',
  });
  const [warnings, setWarnings] = useState<Partial<FormData>>({});

  const isSubmitDisabled =
    requiredFields.some((key) => data[key].trim() === '') ||
    Object.values(warnings).some((warning) => warning !== '');

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let mortgageMonthlyPayment = calculateMonthlyPayment(
      Number(data.loanAmount),
      Number(data.interestRate),
      Number(data.lengthLoan)
    );
    setData({
      mortgagePayment: formatCurrency(mortgageMonthlyPayment),
      loanAmount: data.loanAmount,
      interestRate: data.interestRate,
      lengthLoan: data.lengthLoan,
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof FormData
  ) => {
    if (!/^\d*\.?\d*$/.test(e.target.value.trim())) {
      setWarnings({ ...warnings, [name]: 'Please enter only numbers.' });
    } else {
      setWarnings({ ...warnings, [name]: '' });
      setData({ ...data, [name]: e.target.value.trim() });
    }
  };

  return (
    <MainWrapper>
      <div>
        <form onSubmit={handleFormSubmit}>
          <FormField>
            <Label>Principal loan amount</Label>
            <InputWrapper>
              <Input
                required
                type="text"
                value={data.loanAmount}
                onChange={(e) => handleInputChange(e, 'loanAmount')}
              />
            </InputWrapper>
            {warnings.loanAmount && <Warnings>{warnings.loanAmount}</Warnings>}
          </FormField>

          <FormField>
            <Label>Interest rate</Label>
            <InputWrapper>
              <Input
                required
                type="text"
                value={data.interestRate}
                onChange={(e) => handleInputChange(e, 'interestRate')}
              />
              <Unit>%</Unit>
            </InputWrapper>
            {warnings.interestRate && (
              <Warnings>{warnings.interestRate}</Warnings>
            )}
          </FormField>

          <FormField>
            <Label>Length of loan</Label>
            <InputWrapper>
              <Input
                required
                type="text"
                value={data.lengthLoan}
                onChange={(e) => handleInputChange(e, 'lengthLoan')}
              />
              <Unit>Years</Unit>
            </InputWrapper>
            {warnings.lengthLoan && <Warnings>{warnings.lengthLoan}</Warnings>}
          </FormField>

          <div>
            <Button
              type="submit"
              label="Calculate"
              disabled={isSubmitDisabled}
            />
            <p>Your monthly mortgage payment will be {data.mortgagePayment}</p>
          </div>
        </form>
      </div>
    </MainWrapper>
  );
};

export default Main;
