import { Typography, Box } from "@mui/material";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <Box className={styles.footer}>
      <Typography className={styles.footerText}>
        Make with ❤️ for the MobProgramming team
      </Typography>
    </Box>
  );
}

export default Footer;
