import { Chip, Grid } from "@mui/material";
import { useState } from "react";
import { filterVoices, filterVoicesValue } from "../../../../utils/utils";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import RocketLaunchTwoToneIcon from "@mui/icons-material/RocketLaunchTwoTone";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import DirectionsCarFilledTwoToneIcon from "@mui/icons-material/DirectionsCarFilledTwoTone";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import PetsTwoToneIcon from "@mui/icons-material/PetsTwoTone";
import AllInclusiveTwoToneIcon from "@mui/icons-material/AllInclusiveTwoTone";
import styles from "./HorizontalTile.module.scss";
import { makeStyles } from "@mui/styles";
import CustomChip from "../../atoms/chip/CustomChip";

interface FilterChipsProps {
  onChipClick: (value: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ onChipClick }) => {
  const [selectedFilters, setSelectedFilters] = useState<string>("");

  const handleChipClick = (filter: string) => {
    setSelectedFilters(filter);
    onChipClick(filter);
  };

  const selectIcon = (value: string): React.ReactElement | undefined => {
    switch (value) {
      case filterVoicesValue.ALL:
        return <AllInclusiveTwoToneIcon />;
      case filterVoicesValue.FILMS:
        return <MovieCreationTwoToneIcon />;
      case filterVoicesValue.VEHICLES:
        return <DirectionsCarFilledTwoToneIcon />;
      case filterVoicesValue.PLANETS:
        return <CircleTwoToneIcon />;
      case filterVoicesValue.PEOPLE:
        return <PeopleAltTwoToneIcon />;
      case filterVoicesValue.SPECIES:
        return <PetsTwoToneIcon />;
      case filterVoicesValue.STARSHIPS:
        return <RocketLaunchTwoToneIcon />;
      default:
        return undefined;
    }
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
