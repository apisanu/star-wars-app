import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  text: string;
  onPress: Function;
  children?: React.ReactNode
}
const CustomButton: React.FC<Props> = ({ text, onPress, children }) => {
  const handleClick = (e: any) => {
    onPress();
    e.preventDefault();
  };
  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {children}
      {text}
    </Button>
  );
};

export default CustomButton;
