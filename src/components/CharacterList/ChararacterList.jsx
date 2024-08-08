import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  selectFilters,
  loadMoreCharacters,
  selectPage,
  selectCharacters,
  updateCharacters,
} from "../../store/createSlice";
import { INITIAL_LOAD, LOAD_MORE_COUNT } from "./constants";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./CharacterList.module.css";
import loading from "../../assets/images/Loading.png";

const CustomLoadButton = styled(Button)({
  display: "block",
  margin: "0 auto",
  backgroundColor: "#F2F9FE",
  boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.14)",
  minWidth: "140px",
});

function CharacterList() {
  const dispatch = useDispatch();
  const { status, hasMore } = useSelector((state) => state.characters);
  const characters = useSelector(selectCharacters);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [sortedCharacters, setSortedCharacters] = useState([]);

  useEffect(() => {
    const filteredCharacters = characters
      ? characters.filter((character) => {
          if (filters.species && character.species !== filters.species)
            return false;
          if (filters.gender && character.gender !== filters.gender)
            return false;
          if (filters.status && character.status !== filters.status)
            return false;
          if (
            filters.name &&
            !character.name.toLowerCase().includes(filters.name.toLowerCase())
          )
            return false;
          return true;
        })
      : [];
    console.log(filteredCharacters);

    if (filteredCharacters && filteredCharacters.length > 0) {
      const uniqueCharacters = Array.from(
        new Set(filteredCharacters.map((item) => item.id))
      ).map((id) => {
        return filteredCharacters.find((item) => item.id === id);
      });
      setSortedCharacters(uniqueCharacters);

      if (uniqueCharacters.length < visibleCount) {
        dispatch(fetchCharacters({ filters })).then((result) => {
          dispatch(updateCharacters(result.payload));
        });
        dispatch(loadMoreCharacters());
      }
    } else {
      dispatch(fetchCharacters({ filters })).then((result) => {
        dispatch(updateCharacters(result.payload));
      });
      dispatch(loadMoreCharacters());
      setSortedCharacters(filteredCharacters);

      console.log("Нету");
    }
  }, [characters, filters, visibleCount, hasMore]);

  // useEffect(() => {
  //   if (filters) {
  //     dispatch(fetchCharacters({ filters }));
  //   }
  // }, [filters, dispatch, page]);

  useEffect(() => {
    setVisibleCount(INITIAL_LOAD);
  }, [filters]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    const newVisibleCount = visibleCount + LOAD_MORE_COUNT;

    setVisibleCount(newVisibleCount);
    if (sortedCharacters.length <= visibleCount) {
      dispatch(loadMoreCharacters());
    }
  };
  console.log(visibleCount);
  console.log(sortedCharacters);
  console.log(hasMore);

  return (
    <Container className={styles.wrapper}>
      <Box>
        {status === "loading" ? (
          <Box>
            <img src={loading} alt="" className={styles.loadingImg} />
          </Box>
        ) : (
          <Box className={styles.charlist}>
            {sortedCharacters.length > 0 ? (
              sortedCharacters.slice(0, visibleCount).map((item) => (
                <Link
                  key={item.id}
                  to={`character/${item.id}`}
                  className={styles.cardLink}
                >
                  <Card className={styles.cardCharacter}>
                    <CardContent className={styles.cardCharacterContent}>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                        className={styles.cardCharacterImg}
                      />
                      <Box className={styles.cardCharacterContentText}>
                        <Typography className={styles.cardCharacterName}>
                          {item.name}
                        </Typography>
                        <Typography className={styles.cardCharacterSpecies}>
                          {item.species}
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
      {status !== "loading" && sortedCharacters.length > 0 && hasMore && (
        <Box>
          <CustomLoadButton onClick={(e) => handleLoadMore(e)}>
            Load more
          </CustomLoadButton>
        </Box>
      )}
    </Container>
  );
}

export default CharacterList;
