import loading from "../../assets/images/Loading.png";
import styles from "./Loading.module.css";
import { Box } from "@mui/material";

export default function Loading() {
  return (
    <Box>
      <img src={loading} alt="" className={styles.loadingImg} />
    </Box>
  );
}
