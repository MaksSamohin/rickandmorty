import { Container, Input } from "@mui/material";
import picture from "../../assets/images/rickandmortylocations.png";
import styles from "./TopPanelEpisodes.module.css";
import { Box } from "@mui/material";
import {
  setFilters,
  selectFilters,
  fetchEpisodes,
} from "../../store/episodesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function TopPanelEpisodes() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  useEffect(() => {
    if (filters) {
      dispatch(fetchEpisodes({ filters }));
    }
  }, [filters, dispatch]);

  const handleChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    dispatch(setFilters(newFilters));
    localStorage.setItem("episodesFilters", JSON.stringify(newFilters));
  };

  return (
    <Container className={styles.topPanelEpisodes}>
      <img src={picture} alt="" className={styles.hero} />
      <Box className={styles.filters}>
        <Input
          onChange={(e) => handleChange("name", e.target.value)}
          value={filters.name}
          type="text"
          name="name-filter"
          id={styles.nameFilter}
          className="filter"
          placeholder="Filter by name or episode (ex. S01 or S01E02)"
          sx={{ height: 56, margin: "0 auto", minWidth: 500 }}
        />
      </Box>
    </Container>
  );
}

export default TopPanelEpisodes;
