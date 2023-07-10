import { useState } from "react";
import { filterVoices, filterVoicesValue, selectIcon } from "../../../../utils/utils";
import styles from "./FilterList.module.scss";
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
    <div className={styles.filterList}>
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
