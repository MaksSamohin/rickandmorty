import { Container, Button, Box } from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  selectFilters,
  loadMoreCharacters,
  selectPage,
  selectCharacters,
  updateCharacters,
  charactersLoading,
} from "../../store/charactersSlice";
import {
  INITIAL_LOAD,
  LOAD_MORE_COUNT,
  INITIAL_LOAD_MOBILE,
  LOAD_MORE_COUNT_MOBILE,
} from "./constants";
import { styled } from "@mui/material";
import styles from "./CharactersList.module.css";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen.hook";
import Loading from "../Loading/Loading";
import CharacterCard from "../CharacterCard/CharacterCard";

const CustomLoadButton = styled(Button)({
  display: "block",
  margin: "0 auto",
  backgroundColor: "#F2F9FE",
  boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.14)",
  minWidth: "140px",
});

function CharacterList() {
  let currentInitial = useCheckMobileScreen()
    ? INITIAL_LOAD_MOBILE
    : INITIAL_LOAD;
  let currentLoadMore = useCheckMobileScreen()
    ? LOAD_MORE_COUNT_MOBILE
    : LOAD_MORE_COUNT;
  const dispatch = useDispatch();
  const { status, hasMore } = useSelector((state) => state.characters);
  const characters = useSelector(selectCharacters);
  const loadingChars = useSelector(charactersLoading);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const [visibleCount, setVisibleCount] = useState(currentInitial);
  const [sortedCharacters, setSortedCharacters] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const filteredCharacters = characters.filter((character) => {
      if (filters.species && character.species !== filters.species)
        return false;
      if (filters.gender && character.gender !== filters.gender) return false;
      if (filters.status && character.status !== filters.status) return false;
      if (
        filters.name &&
        !character.name.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      return true;
    });

    const uniqueCharacters = Array.from(
      new Set(filteredCharacters.map((item) => item.id))
    ).map((id) => filteredCharacters.find((item) => item.id === id));

    setSortedCharacters(uniqueCharacters);

    if (uniqueCharacters.length < visibleCount && hasMore) {
      dispatch(fetchCharacters({ page, filters })).then((result) => {
        dispatch(updateCharacters(result.payload));
        dispatch(loadMoreCharacters());
      });
    }
  }, [characters, filters, visibleCount, hasMore, dispatch, page]);

  useEffect(() => {
    setVisibleCount(currentInitial);
  }, [filters]);

  const handleLoadMore = useCallback(
    (e) => {
      scrollRef.current = window.scrollY;

      const newVisibleCount = visibleCount + currentLoadMore;
      setVisibleCount(newVisibleCount);
    },
    [dispatch, sortedCharacters, visibleCount, hasMore, filters, page]
  );

  window.scrollTo({ top: scrollRef.current, behavior: "smooth" });

  return (
    <Container className={styles.wrapper}>
      <Box>
        {loadingChars ? (
          <Loading />
        ) : (
          <Box className={styles.charlist}>
            {sortedCharacters.length > 0 ? (
              sortedCharacters
                .slice(0, visibleCount)
                .map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))
            ) : (
              <Box>No data</Box>
            )}
          </Box>
        )}
      </Box>
      {status !== "loading" &&
        sortedCharacters.length > 0 &&
        (hasMore || visibleCount < sortedCharacters.length) && (
          <Box>
            <CustomLoadButton onClick={handleLoadMore}>
              Load more
            </CustomLoadButton>
          </Box>
        )}
    </Container>
  );
}

export default CharacterList;
