import React from 'react';
import { StyledButton } from './Button.styled';

interface Props {
  onClick?: () => void,
  disabled?: boolean
}

const Button: React.FunctionComponent<Props> = (props) => {
  return <StyledButton {...props}></StyledButton>
}

export default Button;