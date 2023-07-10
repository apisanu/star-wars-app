import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  text: string;
  onPress: Function;
}
const CustomButton: React.FC<Props> = ({ text, onPress }) => {
  const handleClick = (e: any) => {
    onPress();
    e.preventDefault();
  };
  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {text}
    </Button>
  );
};

export default CustomButton;
