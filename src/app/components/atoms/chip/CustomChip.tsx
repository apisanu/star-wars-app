import React from 'react';
import { Chip } from '@mui/material';
import styles from './CustomChip.module.scss';

interface CustomChipProps {
  label: string;
  onClick: () => void;
  selected: boolean;
  icon: React.ReactElement | undefined;
}

const CustomChip: React.FC<CustomChipProps> = ({
  label,
  onClick,
  selected,
  icon,
}) => {
  return (
    <Chip
      className={styles.customChip}
      label={label}
      clickable
      onClick={onClick}
      color={selected ? 'primary' : undefined}
      icon={icon}
    />
  );
};

export default CustomChip;
