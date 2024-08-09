import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Nav from "../../components/Nav/Nav";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./CharacterDetails.module.css";
import arrow from "../../assets/icons/arrow.svg";
import grayArrow from "../../assets/icons/grayArrow.svg";
import { useSelector } from "react-redux";
import { fetchCharacter, selectCharacters } from "../../store/charactersSlice";
import Footer from "../../components/Footer/Footer";
function CharacterDetails() {
  const [character, setCharacter] = useState("");
  const characters = useSelector(selectCharacters);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleGoBack = () => {
    navigate(-1);
  };
  const locationId = character.location
    ? character.location.url.split("/").pop()
    : "";
  useEffect(() => {
    const foundCharacter = characters.find((char) => char.id === +id);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      fetchCharacter(id).then((data) => setCharacter(data));
    }
  }, [characters]);
  console.log(character.location);
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
            <Box className={styles.characterInfoInformations}>
              <Typography className={styles.characterInfoInformationsTitle}>
                Informations
              </Typography>
              <Box className={styles.characterInfoInformationsColumn}>
                <Box className={styles.characterInfoInformationsColumnItem}>
                  <Typography
                    className={styles.characterInfoInformationsItemTitle}
                  >
                    Gender
                  </Typography>
                  <Typography
                    className={styles.characterInfoInformationsItemText}
                  >
                    {character.gender}
                  </Typography>
                </Box>
                <Box className={styles.characterInfoInformationsColumnItem}>
                  <Typography
                    className={styles.characterInfoInformationsItemTitle}
                  >
                    Status
                  </Typography>
                  <Typography
                    className={styles.characterInfoInformationsItemText}
                  >
                    {character.status}
                  </Typography>
                </Box>
                <Box className={styles.characterInfoInformationsColumnItem}>
                  <Typography
                    className={styles.characterInfoInformationsItemTitle}
                  >
                    Specie
                  </Typography>
                  <Typography
                    className={styles.characterInfoInformationsItemText}
                  >
                    {character.species}
                  </Typography>
                </Box>
                <Box className={styles.characterInfoInformationsColumnItem}>
                  <Typography
                    className={styles.characterInfoInformationsItemTitle}
                  >
                    Origin
                  </Typography>
                  <Typography
                    className={styles.characterInfoInformationsItemText}
                  >
                    {character.origin ? character.origin.name : "Unknown"}
                  </Typography>
                </Box>
                <Box className={styles.characterInfoInformationsColumnItem}>
                  <Typography
                    className={styles.characterInfoInformationsItemTitle}
                  >
                    Type
                  </Typography>
                  <Typography
                    className={styles.characterInfoInformationsItemText}
                  >
                    {character.type ? character.type : "No data"}
                  </Typography>
                </Box>
                <Box className={styles.characterInfoInformationsColumnItem}>
                  <Link
                    to={`/location/${locationId}`}
                    className={styles.locationLink}
                  >
                    <Typography
                      className={styles.characterInfoInformationsItemTitle}
                    >
                      Location
                    </Typography>
                    <Typography
                      className={styles.characterInfoInformationsItemText}
                    >
                      {character.location ? character.location.name : "Unknown"}
                    </Typography>
                    <img src={grayArrow} alt="" />
                  </Link>
                </Box>
              </Box>
            </Box>
            <Box className={styles.characterInfoEpisodes}>
              <Typography className={styles.characterInfoEpisodesTitle}>
                Episodes
              </Typography>
              <Box className={styles.characterInfoEpisodesList}>
                {/* {character.episode
                ? character.episode.map((item, index) => {
                    return <Typography>{index}</Typography>;
                  })
                : "No episodes"} */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default CharacterDetails;
