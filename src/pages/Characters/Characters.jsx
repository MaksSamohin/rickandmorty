import TopPanelCharacters from "../../components/TopPanelCharacters/TopPanelCharacters";
import Nav from "../../components/Nav/Nav";
import "./Characters.css";
import CharList from "../../components/CharList/CharList";

function Characters() {
  return (
    <>
      <Nav />
      <TopPanelCharacters />
      <CharList />
    </>
  );
}

export default Characters;
