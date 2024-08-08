import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Nav from "../../components/Nav/Nav";
import { useParams } from "react-router-dom";
import styles from "./CharacterDetails.module.css";
import { useSelector } from "react-redux";
import { fetchCharacter, selectCharacters } from "../../store/createSlice";
function CharacterDetails() {
  const [character, setCharacter] = useState("");
  const characters = useSelector(selectCharacters);
  const { id } = useParams();

  useEffect(() => {
    const foundCharacter = characters.find((char) => char.id === +id);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      fetchCharacter(id).then((data) => setCharacter(data));
    }
  }, [characters]);
  return (
    <>
      <Nav />
      <Container>
        <Box className={styles.detailsTop}>
          <img src={character.image} alt="" className={styles.detailsHero} />
          <Typography>{character.name}</Typography>
        </Box>
      </Container>
    </>
  );
}

export default CharacterDetails;
