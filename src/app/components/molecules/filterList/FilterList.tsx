import { Chip, Grid } from "@mui/material";
import { useState } from "react";
import { filterVoices, filterVoicesValue, selectIcon } from "../../../../utils/utils";
import styles from "./HorizontalTile.module.scss";
import CustomChip from "../../atoms/chip/CustomChip";

interface FilterChipsProps {
  onChipClick: (value: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ onChipClick }) => {
  const [selectedFilters, setSelectedFilters] = useState<string>(filterVoicesValue.ALL);

  const handleChipClick = (filter: string) => {
    setSelectedFilters(filter);
    onChipClick(filter);
  };

  return (
    <div className="filter-list">
      {filterVoices.map(({ text, value }) => (
        <CustomChip
          key={text}
          label={text}
          onClick={() => handleChipClick(value)}
          selected={selectedFilters.includes(value)}
          icon={selectIcon(value)}
        />
      ))}
    </div>
  );
};

export default FilterChips;
