import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import grayArrow from "../../assets/icons/grayArrow.svg";
import styles from "./CharacterDetailsInformations.module.css";
import React from "react";

function CharacterDetailsInformations({ character }) {
  const locationId = character.location
    ? character.location.url.split("/").pop()
    : "";

  return (
    <Box className={styles.characterInformations}>
      <Typography className={styles.characterInformationsTitle}>
        Informations
      </Typography>
      <Box className={styles.characterInformationsColumn}>
        <Box className={styles.characterInformationsColumnItem}>
          <Typography className={styles.characterInformationsItemTitle}>
            Gender
          </Typography>
          <Typography className={styles.characterInformationsItemText}>
            {character.gender}
          </Typography>
        </Box>
        <Box className={styles.characterInformationsColumnItem}>
          <Typography className={styles.characterInformationsItemTitle}>
            Status
          </Typography>
          <Typography className={styles.characterInformationsItemText}>
            {character.status}
          </Typography>
        </Box>
        <Box className={styles.characterInformationsColumnItem}>
          <Typography className={styles.characterInformationsItemTitle}>
            Specie
          </Typography>
          <Typography className={styles.characterInformationsItemText}>
            {character.species}
          </Typography>
        </Box>
        <Box className={styles.characterInformationsColumnItem}>
          <Typography className={styles.characterInformationsItemTitle}>
            Origin
          </Typography>
          <Typography className={styles.characterInformationsItemText}>
            {character.origin ? character.origin.name : "Unknown"}
          </Typography>
        </Box>
        <Box className={styles.characterInformationsColumnItem}>
          <Typography className={styles.characterInformationsItemTitle}>
            Type
          </Typography>
          <Typography className={styles.characterInformationsItemText}>
            {character.type ? character.type : "No data"}
          </Typography>
        </Box>
        <Box className={styles.characterInformationsColumnItem}>
          <Link to={`/location/${locationId}`} className={styles.locationLink}>
            <Typography className={styles.characterInformationsItemTitle}>
              Location
            </Typography>
            <Typography className={styles.characterInformationsItemText}>
              {character.location ? character.location.name : "Unknown"}
            </Typography>
            <img
              src={grayArrow}
              alt="arrow"
              className={styles.locationArrowLink}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default CharacterDetailsInformations;
