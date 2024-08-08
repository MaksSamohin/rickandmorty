import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Nav from "../../components/Nav/Nav";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CharacterDetails.module.css";
import arrow from "../../assets/icons/arrow.svg";
import { useSelector } from "react-redux";
import { fetchCharacter, selectCharacters } from "../../store/createSlice";
function CharacterDetails() {
  const [character, setCharacter] = useState("");
  const characters = useSelector(selectCharacters);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const foundCharacter = characters.find((char) => char.id === +id);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      fetchCharacter(id).then((data) => setCharacter(data));
    }
  }, [characters]);
  console.log(character);
  return (
    <>
      <Nav />
      <Container>
        <Box className={styles.detailsTop}>
          <Button onClick={handleGoBack} className={styles.detailsBackButton}>
            <img src={arrow} alt="Back arrow" className={styles.arrowBack} />
            Go back
          </Button>
          <img src={character.image} alt="" className={styles.detailsHero} />
          <Typography>{character.name}</Typography>
        </Box>
      </Container>
    </>
  );
}

export default CharacterDetails;
