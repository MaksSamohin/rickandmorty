import TopPanelCharacters from "../../components/TopPanelCharacters/TopPanelCharacters";
import Nav from "../../components/Nav/Nav";
import "./Characters.css";
import CharacterList from "../../components/CharacterList/ChararacterList";
import Footer from "../../components/Footer/Footer";

function Characters() {
  return (
    <>
      <Nav />
      <TopPanelCharacters />
      <CharacterList />
      <Footer />
    </>
  );
}

export default Characters;
