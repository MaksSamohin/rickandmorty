import Nav from "../../components/Nav/Nav";
import "./Episodes.css";
import TopPanelEpisodes from "../../components/TopPanelEpisodes/TopPanelEpisodes";
import EpisodesList from "../../components/EpisodesList/EpisodesList";
import Footer from "../../components/Footer/Footer";

function Episodes() {
  return (
    <>
      <Nav />
      <TopPanelEpisodes />
      <EpisodesList />
      <Footer />
    </>
  );
}

export default Episodes;
