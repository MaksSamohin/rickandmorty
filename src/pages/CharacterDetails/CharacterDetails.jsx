import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Nav from "../../components/Nav/Nav";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./CharacterDetails.module.css";
import arrow from "../../assets/icons/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacter, selectCharacters } from "../../store/charactersSlice";
import Footer from "../../components/Footer/Footer";
import CharacterDetailsInformations from "../../components/CharacterDetailsInformations/CharacterDetailsInformations";
import CharacterDetailsEpisodes from "../../components/CharacterDetailsEpisodes/CharacterDetailsEpisodes";

function CharacterDetails() {
  const [character, setCharacter] = useState("");
  const dispatch = useDispatch();
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
      dispatch(fetchCharacter(id))
        .unwrap()
        .then((data) => {
          setCharacter(data);
        });
    }
  }, [characters]);

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
          <Typography className={styles.characterName}>
            {character.name}
          </Typography>
          <Box className={styles.characterInfo}>
            <CharacterDetailsInformations character={character} />
            <CharacterDetailsEpisodes character={character} />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default CharacterDetails;
