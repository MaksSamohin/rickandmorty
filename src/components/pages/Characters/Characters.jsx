import MainCharacters from './MainCharacters/MainCharacters';
import Nav from '../../Nav/Nav';
import './Characters.css';
import CharList from '../../CharList/CharList';

function Characters() {
    return (
        <>
            <Nav />
            <MainCharacters />
            <CharList />
        </>
    )
}

export default Characters;
