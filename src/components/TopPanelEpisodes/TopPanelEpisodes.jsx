import { Container, Input } from "@mui/material";
import picture from "../../assets/images/rickandmortyepisodes.png";
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
    const newFilters = { ...filters };

    const episodePattern = /^S\d{2}(E\d{2})?$/i;
    if (episodePattern.test(value)) {
      newFilters.episode = value;
      newFilters.name = "";
    } else {
      newFilters.name = value;
      newFilters.episode = "";
    }

    dispatch(setFilters(newFilters));
    localStorage.setItem("episodesFilters", JSON.stringify(newFilters));
  };

  return (
    <Container className={styles.topPanelEpisodes}>
      <img src={picture} alt="" className={styles.hero} />
      <Box className={styles.filters}>
        <Input
          onChange={(e) => handleChange("query", e.target.value)}
          value={filters.name || filters.episode || ""}
          type="text"
          name="name-filter"
          id={styles.nameFilter}
          className="filter"
          placeholder="Filter by name or episode (ex. S01 or S01E02)"
        />
      </Box>
    </Container>
  );
}

export default TopPanelEpisodes;
