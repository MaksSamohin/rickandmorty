async function fetchAllCards () {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const json = await response.json();
        console.log(json.results)
        return json.results;
}
export default fetchAllCards