import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import grayArrow from "../../assets/icons/grayArrow.svg";

function EpisodeCard({ ep }) {
  return (
    <Link key={ep.id} to={`/episode/${ep.id}`} className={styles.episodeLink}>
      <Box className={styles.episode}>
        <Typography className={styles.episodeNumber}>{ep.episode}</Typography>
        <Typography className={styles.episodeName}>{ep.name}</Typography>
        <Typography className={styles.episodeAirdate}>{ep.air_date}</Typography>
        <img src={grayArrow} alt="arrow" className={styles.episodeArrowLink} />
      </Box>
    </Link>
  );
}

export default EpisodeCard;
