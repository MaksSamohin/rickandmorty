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
import styles from "./CharList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  selectFilters,
  loadMoreCharacters,
  selectPage,
  selectCharacters,
} from "../../store/createSlice";
import { INITIAL_LOAD, LOAD_MORE_COUNT } from "./constants";
import { styled } from "@mui/material";

const CustomLoadButton = styled(Button)({
  display: "block",
  margin: "0 auto",
  backgroundColor: "#F2F9FE",
  boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.14)",
  minWidth: "140px",
});

function CharList() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.characters);
  const characters = useSelector(selectCharacters);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);

  useEffect(() => {
    if (status === "idle" || status === "succeeded") {
      dispatch(fetchCharacters({ filters, page }));
    }
  }, [filters, dispatch, page]);

  useEffect(() => {
    setVisibleCount(INITIAL_LOAD);
  }, [filters]);
  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + LOAD_MORE_COUNT;

    setVisibleCount(newVisibleCount);

    if (newVisibleCount >= characters.length) {
      dispatch(loadMoreCharacters());
    }
  };

  console.log(characters);
  return (
    <Container>
      <Box className={styles.charlist}>
        {characters ? (
          characters.slice(0, visibleCount).map((item, index) => {
            return (
              <Card key={item.id} className={styles.cardCharacter}>
                <CardContent>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{ width: "100%", height: "140px" }}
                  />
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>{item.species}</Typography>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Box>Данных нет</Box>
        )}
      </Box>
      <CustomLoadButton
        onClick={() => {
          handleLoadMore();
          loadMoreCharacters();
        }}
      >
        Load more
      </CustomLoadButton>
    </Container>
  );
}

export default CharList;
