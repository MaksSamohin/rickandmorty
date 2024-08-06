import {
  Container,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import picture from "../../assets/images/rickandmorty.png";
import styles from "./TopPanelCharacters.module.css";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  selectFilters,
  selectCharacters,
  sortCharacters,
} from "../../store/createSlice";

function TopPanelCharacters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const characters = useSelector(selectCharacters);

  const handleChange = (name, value) => {
    dispatch(sortCharacters({ sortField: name, sortValue: value }));
  };

  const currentSpecies = [];
  const currentGender = [];
  const currentStatus = [];
  if (characters) {
    characters.forEach((item) => {
      if (!currentSpecies.includes(item.species)) {
        currentSpecies.push(item.species);
      }
      if (!currentGender.includes(item.gender)) {
        currentGender.push(item.gender);
      }
      if (!currentStatus.includes(item.status)) {
        currentStatus.push(item.status);
      }
    });
  }

  return (
    <Container className={styles.topPanelCharacters}>
      <img src={picture} alt="" className={styles.hero} />
      <Box className={styles.filters}>
        <Input
          onChange={(e) => handleChange("name", e.target.value)}
          value={filters.name}
          type="text"
          name="name"
          id="name"
          className={styles.filter}
          placeholder="Filter by name"
          sx={{ height: 56 }}
        />
        <FormControl>
          <InputLabel id="select-species">Species</InputLabel>
          <Select
            value={filters.species}
            onChange={(e) => handleChange("species", e.target.value)}
            labelId="select-species"
            id="species"
            className={styles.filter}
            label="Species"
            sx={{
              height: 56,
              backgroundImage: "url('./assets/images/Vector.svg')",
            }}
          >
            <MenuItem value="">Species</MenuItem>
            {currentSpecies.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-genders">Gender</InputLabel>
          <Select
            value={filters.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            labelId="select-gender"
            id="gender"
            className={styles.filter}
            label="Gender"
            sx={{ height: 56 }}
          >
            <MenuItem value="">Gender</MenuItem>
            {currentGender.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-species">Status</InputLabel>
          <Select
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
            labelId="select-status"
            id="status"
            className={styles.filter}
            label="Status"
            sx={{ height: 56 }}
          >
            <MenuItem value="">Status</MenuItem>
            {currentStatus.map((item) => {
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

export default TopPanelCharacters;
