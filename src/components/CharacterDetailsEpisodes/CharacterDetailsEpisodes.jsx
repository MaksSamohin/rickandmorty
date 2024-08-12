import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./CharacterDetailsEpisodes.module.css";
import { Link } from "react-router-dom";
import grayArrow from "../../assets/icons/grayArrow.svg";
import { useDispatch } from "react-redux";
import { fetchEpisode } from "../../store/episodesSlice";

function CharacterDetailsEpisodes({ character }) {
  const dispatch = useDispatch();
  const [episodes, setEpisodes] = useState("");
  useEffect(() => {
    if (character && character.episode) {
      const id = character.episode
        .map((url) => url.split("/").pop())
        .toString();

      dispatch(fetchEpisode(id))
        .unwrap()
        .then((data) => {
          if (Array.isArray(data)) {
            setEpisodes(data);
          } else {
            setEpisodes([data]);
          }
        });
    }
  }, [character]);

  return (
    <Box className={styles.characterEpisodes}>
      <Typography className={styles.characterEpisodesTitle}>
        Episodes
      </Typography>
      <Box className={styles.characterEpisodesList}>
        {episodes
          ? episodes.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <Link
                    to={`/episode/${item.id}`}
                    className={styles.characterEpisodesLink}
                  >
                    <Box className={styles.characterEpisode}>
                      <Typography className={styles.characterEpisodeNumber}>
                        {item.episode}
                      </Typography>
                      <Typography className={styles.characterEpisodeName}>
                        {item.name}
                      </Typography>
                      <Typography className={styles.characterEpisodeAirdate}>
                        {item.air_date}
                      </Typography>
                      <img
                        src={grayArrow}
                        alt="arrow"
                        className={styles.episodeArrowLink}
                      />
                    </Box>
                  </Link>
                  <hr className={styles.characterLine}></hr>
                </React.Fragment>
              );
            })
          : "No episodes"}
      </Box>
    </Box>
  );
}

export default CharacterDetailsEpisodes;
