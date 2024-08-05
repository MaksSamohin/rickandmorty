import { Container, Input, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import picture from '../../../../assets/images/rickandmortyepisodes.png'
import './MainEpisodes.css';
import { Box }  from '@mui/material';

function MainEpisodes() {
    return (
        <Container>
        <img src={picture} alt="" className="main-picture" />
        <Box className="filters">
            <Input 
            type="text" 
            name="name-filter" 
            id="name-filter" 
            className='filter' 
            placeholder='Filter by name or episode (ex. S01 or S01E02)'
            sx={{ height: 56, margin: '0 auto', minWidth: 500}} />
        </Box>
        </Container>
    )
}

export default MainEpisodes;