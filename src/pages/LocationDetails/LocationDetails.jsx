import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLocations,
  fetchLocation,
  selectStatus,
} from "../../store/locationsSlice";
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
import styles from "./LocationDetails.module.css";
import arrow from "../../assets/icons/arrow.svg";
import { Link } from "react-router-dom";
import { selectCharacters } from "../../store/charactersSlice";

function LocationDetails() {
  const navigate = useNavigate();
  const locations = useSelector(selectLocations);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [location, setLocation] = useState("");
  const [residents, setResidents] = useState([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const foundLocation = locations.find((loc) => loc.id === +id);
    if (foundLocation) {
      setLocation(foundLocation);
    } else {
      dispatch(fetchLocation(id))
        .unwrap()
        .then((data) => {
          setLocation(data);
        });
    }
  }, [locations]);
  useEffect(() => {
    if (location && location.residents) {
      const fetchAllResidents = async () => {
        const residentDataPromises = location.residents.map((url) => {
          return fetch(url).then((response) => response.json());
        });
        const residentData = await Promise.all(residentDataPromises);
        setResidents(residentData);
      };

      fetchAllResidents();
    }
  }, [location]);

  return (
    <>
      <Nav />
      <Container>
        <Box className={styles.detailsTop}>
          <Button onClick={handleGoBack} className={styles.detailsBackButton}>
            <img src={arrow} alt="Back arrow" className={styles.arrowBack} />
            Go back
          </Button>

          <Box className={styles.locationWrapper}>
            <Box className={styles.locationInfo}>
              <Typography className={styles.locationName}>
                {location.name}
              </Typography>
              <Box className={styles.locationInfoBox}>
                <Box className={styles.locationInfoType}>
                  <Typography className={styles.locationInfoTypeTitle}>
                    Type
                  </Typography>
                  <Typography className={styles.locationInfoTypeText}>
                    {location.type}
                  </Typography>
                </Box>
                <Box className={styles.locationInfoDimension}>
                  <Typography className={styles.locationInfoDimensionTitle}>
                    Type
                  </Typography>
                  <Typography className={styles.locationInfoDimensionText}>
                    {location.dimension}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={styles.locationResidents}>
            <Typography className={styles.locationResidentsTitle}>
              Residents
            </Typography>
            <Box className={styles.locationResidentsList}>
              {residents.length > 0 ? (
                residents.map((item) => (
                  <Link
                    key={item.id}
                    to={`/character/${item.id}`}
                    className={styles.cardLink}
                  >
                    <Card className={styles.cardCharacter}>
                      <CardContent className={styles.cardCharacterContent}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          className={styles.cardCharacterImg}
                        />
                        <Box className={styles.cardCharacterContentText}>
                          <Typography className={styles.cardCharacterName}>
                            {item.name}
                          </Typography>
                          <Typography className={styles.cardCharacterSpecies}>
                            {item.species}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <Typography>No residents found</Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default LocationDetails;
