import TopPanelCharacters from "../../components/TopPanelCharacters/TopPanelCharacters";
import Nav from "../../components/Nav/Nav";
import CharacterList from "../../components/CharactersList/CharactersList";
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
