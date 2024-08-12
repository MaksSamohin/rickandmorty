import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEpisodes, fetchEpisode } from "../../store/episodesSlice";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import {
  Box,
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import styles from "./EpisodeDetails.module.css";
import arrow from "../../assets/icons/arrow.svg";
import { Link } from "react-router-dom";
import {
  fetchCharacter,
  fetchCharactersByID,
} from "../../store/charactersSlice";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

function EpisodeDetails() {
  const navigate = useNavigate();
  const episodes = useSelector(selectEpisodes);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [episode, setEpisode] = useState("");
  const [cast, setCast] = useState([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const foundEpisode = episodes.find((ep) => ep.id === +id);
    if (foundEpisode) {
      setEpisode(foundEpisode);
    } else {
      dispatch(fetchEpisode(id))
        .unwrap()
        .then((data) => {
          setEpisode(data);
        });
    }
  }, [episodes]);

  useEffect(() => {
    if (episode && episode.characters) {
      const id = episode.characters
        .map((url) => url.split("/").pop())
        .toString();

      dispatch(fetchCharacter(id))
        .unwrap()
        .then((data) => setCast(data));
    }
  }, [episode]);

  return (
    <>
      <Nav />
      <Container>
        <Box className={styles.detailsTop}>
          <Button onClick={handleGoBack} className={styles.detailsBackButton}>
            <img src={arrow} alt="Back arrow" className={styles.arrowBack} />
            Go back
          </Button>

          <Box className={styles.episodeWrapper}>
            <Box className={styles.episodeInfo}>
              <Typography className={styles.episodeName}>
                {episode.name}
              </Typography>
              <Box className={styles.episodeInfoBox}>
                <Box className={styles.episodeInfoType}>
                  <Typography className={styles.episodeInfoTypeTitle}>
                    Episode
                  </Typography>
                  <Typography className={styles.episodeInfoTypeText}>
                    {episode.episode}
                  </Typography>
                </Box>
                <Box className={styles.episodeInfoDimension}>
                  <Typography className={styles.episodeInfoDimensionTitle}>
                    Date
                  </Typography>
                  <Typography className={styles.episodeInfoDimensionText}>
                    {episode.air_date}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={styles.episodeResidents}>
            <Typography className={styles.episodeResidentsTitle}>
              Cast
            </Typography>
            <Box className={styles.episodeResidentsList}>
              {cast.length > 0 ? (
                cast.map((character) => <CharacterCard character={character} />)
              ) : (
                <Typography>No cast</Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default EpisodeDetails;
