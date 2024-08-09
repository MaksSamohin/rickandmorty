import {
  Container,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import picture from "../../assets/images/rickandmortylocations.png";
import styles from "./TopPanelLocations.module.css";
import { Box } from "@mui/material";
import {
  setFilters,
  selectFilters,
  fetchLocations,
  selectAvailableFilters,
} from "../../store/locationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function TopPanelLocations() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const availableFilters = useSelector(selectAvailableFilters);

  useEffect(() => {
    if (filters) {
      dispatch(fetchLocations({ filters }));
    }
  }, [filters, dispatch]);

  const handleChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    dispatch(setFilters(newFilters));
    localStorage.setItem("locationsFilters", JSON.stringify(newFilters));
  };

  return (
    <Container className={styles.topPanelLocations}>
      <img src={picture} alt="" className={styles.hero} />
      <Box className={styles.locationFilters}>
        <Input
          onChange={(e) => handleChange("name", e.target.value)}
          value={filters.name}
          type="text"
          name="name-filter"
          id={styles.nameFilter}
          className={styles.filter}
          placeholder="Filter by name"
          sx={{ height: 56 }}
        />
        <FormControl>
          <InputLabel id="select-types">Type</InputLabel>
          <Select
            onChange={(e) => handleChange("type", e.target.value)}
            value={filters.type}
            labelId="select-types"
            id={styles.typeFilter}
            className={styles.filter}
            label="Type"
            sx={{
              height: 56,
              backgroundImage: "url('./assets/images/Vector.svg')",
            }}
          >
            <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
              None
            </MenuItem>
            {availableFilters.type.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-dimensions">Dimension</InputLabel>
          <Select
            onChange={(e) => handleChange("dimension", e.target.value)}
            value={filters.dimension}
            labelId="select-dimension"
            id={styles.dimensionFilter}
            className={styles.filter}
            label="Dimension"
            sx={{ height: 56 }}
          >
            <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
              None
            </MenuItem>
            {availableFilters.dimension.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}

export default TopPanelLocations;
