import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  text: string;
  onPress: Function;
  children?: React.ReactNode
  variant?: 'text' | 'contained' | 'outlined'; 
}
const CustomButton: React.FC<Props> = ({ text, onPress, children, variant = 'outlined' }) => {
  const handleClick = (e: any) => {
    onPress();
    e.preventDefault();
  };
  return (
    <Button variant={variant} color="primary" onClick={handleClick}>
      {children}
      {text}
    </Button>
  );
};

export default CustomButton;
