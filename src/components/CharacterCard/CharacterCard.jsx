import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Box, Typography } from "@mui/material";
import styles from "./CharacterCard.module.css";

function CharacterCard({ character }) {
  return (
    <Link to={`/character/${character.id}`} className={styles.cardLink}>
      <Card className={styles.cardCharacter}>
        <CardContent className={styles.cardCharacterContent}>
          <CardMedia
            component="img"
            image={character.image}
            alt={character.name}
            className={styles.cardCharacterImg}
          />
          <Box className={styles.cardCharacterContentText}>
            <Typography className={styles.cardCharacterName}>
              {character.name}
            </Typography>
            <Typography className={styles.cardCharacterSpecies}>
              {character.species}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CharacterCard;
