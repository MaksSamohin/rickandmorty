import {
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEpisodes,
  selectFilters,
  loadMoreEpisodes,
  selectPage,
  selectEpisodes,
  updateEpisodes,
  episodesLoading,
} from "../../store/episodesSlice";
import {
  INITIAL_LOAD,
  LOAD_MORE_COUNT,
  INITIAL_LOAD_MOBILE,
  LOAD_MORE_COUNT_MOBILE,
} from "./constants";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./EpisodesList.module.css";
import loading from "../../assets/images/Loading.png";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen.hook";

const CustomLoadButton = styled(Button)({
  display: "block",
  margin: "0 auto",
  backgroundColor: "#F2F9FE",
  boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.14)",
  minWidth: "140px",
});

function EpisodesList() {
  let currentInitial = useCheckMobileScreen()
    ? INITIAL_LOAD_MOBILE
    : INITIAL_LOAD;
  let currentLoadMore = useCheckMobileScreen()
    ? LOAD_MORE_COUNT_MOBILE
    : LOAD_MORE_COUNT;
  const dispatch = useDispatch();
  const { status, hasMore } = useSelector((state) => state.episodes);
  const episodes = useSelector(selectEpisodes);
  const loadingEps = useSelector(episodesLoading);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const [visibleCount, setVisibleCount] = useState(currentInitial);
  const [sortedEpisodes, setSortedEpisodes] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const filteredEpisodes = episodes.filter((episode) => {
      if (filters.type && episode.type !== filters.type) return false;
      if (filters.dimension && episode.dimension !== filters.dimension)
        return false;
      if (
        filters.name &&
        !episode.name.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      return true;
    });

    const uniqueEpisodes = Array.from(
      new Set(filteredEpisodes.map((item) => item.id))
    ).map((id) => filteredEpisodes.find((item) => item.id === id));

    setSortedEpisodes(uniqueEpisodes);

    if (uniqueEpisodes.length < visibleCount && hasMore) {
      dispatch(fetchEpisodes({ page, filters })).then((result) => {
        dispatch(updateEpisodes(result.payload));
        dispatch(loadMoreEpisodes());
      });
    }
  }, [episodes, filters, visibleCount, hasMore, dispatch, page]);

  useEffect(() => {
    setVisibleCount(currentInitial);
  }, [filters]);

  const handleLoadMore = useCallback(
    (e) => {
      e.preventDefault();
      scrollRef.current = window.scrollY;

      const newVisibleCount = visibleCount + currentLoadMore;
      setVisibleCount(newVisibleCount);
    },
    [dispatch, sortedEpisodes, visibleCount, hasMore, filters, page]
  );

  window.scrollTo({ top: scrollRef.current, behavior: "smooth" });
  return (
    <Container className={styles.wrapper}>
      <Box>
        {loadingEps ? (
          <Box>
            <img src={loading} alt="" className={styles.loadingImg} />
          </Box>
        ) : (
          <Box className={styles.eplist}>
            {sortedEpisodes.length > 0 ? (
              sortedEpisodes.slice(0, visibleCount).map((item) => (
                <Link
                  key={item.id}
                  to={`/episode/${item.id}`}
                  className={styles.cardLink}
                >
                  <Card className={styles.cardEpisode}>
                    <CardContent className={styles.cardEpisodeContent}>
                      <Box className={styles.cardEpisodeContentText}>
                        <Typography className={styles.cardEpisodeName}>
                          {item.name}
                        </Typography>
                        <Typography className={styles.cardEpisodeAirdate}>
                          {item.air_date}
                        </Typography>
                        <Typography className={styles.cardEpisodeNumber}>
                          {item.episode}
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
        sortedEpisodes.length > 0 &&
        (hasMore || visibleCount < sortedEpisodes.length) && (
          <Box>
            <CustomLoadButton onClick={handleLoadMore}>
              Load more
            </CustomLoadButton>
          </Box>
        )}
    </Container>
  );
}

export default EpisodesList;
