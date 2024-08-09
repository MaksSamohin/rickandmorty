import {
  Container,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Modal,
} from "@mui/material";
import picture from "../../assets/images/rickandmorty.png";
import filterIcon from "../../assets/icons/filter.svg";
import styles from "./TopPanelCharacters.module.css";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  selectFilters,
  fetchCharacters,
  selectAvailableFilters,
} from "../../store/charactersSlice";
import { useEffect, useState } from "react";

function TopPanelCharacters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const availableFilters = useSelector(selectAvailableFilters);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (filters) {
      dispatch(fetchCharacters({ filters }));
    }
  }, [filters, dispatch]);

  const handleChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    dispatch(setFilters(newFilters));
    localStorage.setItem("charactersFilters", JSON.stringify(newFilters));
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
        <Box className={styles.advancedFilters}>
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
              <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
                None
              </MenuItem>
              {availableFilters.species.map((item) => {
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
              <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
                None
              </MenuItem>
              {availableFilters.gender.map((item) => {
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
              <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
                None
              </MenuItem>
              {availableFilters.status.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Button
        className={styles.advancedFiltersMobile}
        onClick={handleOpenModal}
      >
        <img src={filterIcon} alt="Filter" />
        Advanced filters
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.advancedFiltersModal}>
          <FormControl>
            <InputLabel id="select-species">Species</InputLabel>
            <Select
              value={filters.species}
              onChange={(e) => handleChange("species", e.target.value)}
              labelId="select-species"
              id="species"
              className={styles.filterModal}
              label="Species"
              sx={{
                height: 56,
                backgroundImage: "url('./assets/images/Vector.svg')",
              }}
            >
              <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
                None
              </MenuItem>
              {availableFilters.species.map((item) => {
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
              className={styles.filterModal}
              label="Gender"
              sx={{ height: 56 }}
            >
              <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
                None
              </MenuItem>
              {availableFilters.gender.map((item) => {
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
              className={styles.filterModal}
              label="Status"
              sx={{ height: 56 }}
            >
              <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
                None
              </MenuItem>
              {availableFilters.status.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </Container>
  );
}

export default TopPanelCharacters;
