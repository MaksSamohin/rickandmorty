import {
  Container,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import picture from "../../assets/images/rickandmortylocations.png";
import styles from "./TopPanelLocations.module.css";
import filterIcon from "../../assets/icons/filter.svg";
import {
  setFilters,
  selectFilters,
  fetchLocations,
  selectAvailableFilters,
} from "../../store/locationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen.hook";

function TopPanelLocations() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const availableFilters = useSelector(selectAvailableFilters);
  const [openModal, setOpenModal] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

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

  const handleChangeTemp = (name, value) => {
    if (name === "name") {
      setTempFilters((prev) => ({ ...prev, [name]: value }));
      const newFilters = { ...tempFilters, [name]: value };
      dispatch(setFilters(newFilters));
      localStorage.setItem("locationsFilters", JSON.stringify(newFilters));
    } else {
      setTempFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(tempFilters));
    localStorage.setItem("locationsFilters", JSON.stringify(tempFilters));
    setOpenModal(false);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Container className={styles.topPanelLocations}>
      <img src={picture} alt="" className={styles.hero} />
      <Box className={styles.locationFilters}>
        <Input
          onChange={(e) => handleChangeTemp("name", e.target.value)}
          value={filters.name}
          type="text"
          name="name-filter"
          id={styles.nameFilter}
          className={styles.filter}
          placeholder="Filter by name"
          sx={{ height: 56 }}
        />
        <Box className={styles.advancedFilters}>
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
            <Typography className={styles.advancedFiltersModalTitle}>
              Filters
            </Typography>
            <FormControl>
              <InputLabel id="select-types">Type</InputLabel>
              <Select
                onChange={(e) => handleChangeTemp("type", e.target.value)}
                value={tempFilters.type}
                labelId="select-types"
                id={styles.typeFilter}
                className={styles.filter}
                label="Type"
                sx={{
                  height: 56,
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
                onChange={(e) => handleChangeTemp("dimension", e.target.value)}
                value={tempFilters.dimension}
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
            <Button
              className={styles.applyFiltersMobile}
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default TopPanelLocations;
