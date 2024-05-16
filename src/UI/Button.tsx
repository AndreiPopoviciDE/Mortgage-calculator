//This component is made only for practice
import React from 'react';
import styled from 'styled-components';

type ButtonType = 'submit' | 'reset' | 'button';

interface ButtonProps {
  type?: ButtonType;
  label: string;
  disabled?: boolean;
}

const StyledButton = styled.button`
  background: #d5d4d4;
  padding: 15px;
  font-size: 20px;
  border-radius: 5px;
  margin: 20px;
  border: 0;
  cursor: pointer;
`;

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  label,
  disabled,
}) => {
  return (
    <StyledButton type={type} disabled={disabled}>
      {label}
    </StyledButton>
  );
};

export default Button;
