import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocations,
  selectFilters,
  loadMoreLocations,
  selectPage,
  selectLocations,
  updateLocations,
  locationsLoading,
} from "../../store/locationsSlice";
import { INITIAL_LOAD, LOAD_MORE_COUNT } from "./constants";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./LocationsList.module.css";
import loading from "../../assets/images/Loading.png";

const CustomLoadButton = styled(Button)({
  display: "block",
  margin: "0 auto",
  backgroundColor: "#F2F9FE",
  boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.14)",
  minWidth: "140px",
});

function LocationsList() {
  const dispatch = useDispatch();
  const { status, hasMore } = useSelector((state) => state.locations);
  const locations = useSelector(selectLocations);
  const loadingLocs = useSelector(locationsLoading);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [sortedLocations, setSortedLocations] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const filteredLocations = locations.filter((location) => {
      if (filters.type && location.type !== filters.type) return false;
      if (filters.dimension && location.dimension !== filters.dimension)
        return false;
      if (
        filters.name &&
        !location.name.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      return true;
    });

    const uniqueLocations = Array.from(
      new Set(filteredLocations.map((item) => item.id))
    ).map((id) => filteredLocations.find((item) => item.id === id));

    setSortedLocations(uniqueLocations);

    if (uniqueLocations.length < visibleCount && hasMore) {
      dispatch(fetchLocations({ page, filters })).then((result) => {
        dispatch(updateLocations(result.payload));
        dispatch(loadMoreLocations());
      });
    }
  }, [locations, filters, visibleCount, hasMore, dispatch, page]);

  useEffect(() => {
    setVisibleCount(INITIAL_LOAD);
  }, [filters]);

  const handleLoadMore = useCallback(
    (e) => {
      e.preventDefault();
      scrollRef.current = window.scrollY;

      const newVisibleCount = visibleCount + LOAD_MORE_COUNT;
      setVisibleCount(newVisibleCount);

      if (sortedLocations.length <= visibleCount && hasMore) {
        dispatch(fetchLocations({ page: page + 1, filters })).then((result) => {
          dispatch(updateLocations(result.payload));
        });
        dispatch(loadMoreLocations());
      }
    },
    [dispatch, sortedLocations, visibleCount, hasMore, filters, page]
  );

  window.scrollTo({ top: scrollRef.current, behavior: "smooth" });

  return (
    <Container className={styles.wrapper}>
      <Box>
        {loadingLocs ? (
          <Box>
            <img src={loading} alt="" className={styles.loadingImg} />
          </Box>
        ) : (
          <Box className={styles.loclist}>
            {sortedLocations.length > 0 ? (
              sortedLocations.slice(0, visibleCount).map((item) => (
                <Link
                  key={item.id}
                  to={`location/${item.id}`}
                  className={styles.cardLink}
                >
                  <Card className={styles.cardLocation}>
                    <CardContent className={styles.cardLocationContent}>
                      <Box className={styles.cardLocationContentText}>
                        <Typography className={styles.cardLocationName}>
                          {item.name}
                        </Typography>
                        <Typography className={styles.cardLocationType}>
                          {item.type}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <Box>No data</Box>
            )}
          </Box>
        )}
      </Box>
      {status !== "loading" &&
        sortedLocations.length > 0 &&
        (hasMore || visibleCount < sortedLocations.length) && (
          <Box>
            <CustomLoadButton onClick={handleLoadMore}>
              Load more
            </CustomLoadButton>
          </Box>
        )}
    </Container>
  );
}

export default LocationsList;
