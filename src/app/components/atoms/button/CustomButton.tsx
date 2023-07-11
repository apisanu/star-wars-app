import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  text: string;
  onPress: Function;
  children?: React.ReactNode;
  variant?: 'text' | 'contained' | 'outlined';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
}
const CustomButton: React.FC<Props> = ({
  text,
  onPress,
  children,
  variant = 'outlined',
  color = 'primary',
}) => {
  const handleClick = (e: any) => {
    onPress();
    e.preventDefault();
  };
  return (
    <Button variant={variant} color={color} onClick={handleClick}>
      {children}
      {text}
    </Button>
  );
};

export default CustomButton;
