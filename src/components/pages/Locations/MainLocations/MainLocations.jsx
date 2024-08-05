import { Container, Input, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import picture from '../../../../assets/images/rickandmortylocations.png'
import './MainLocations.css';
import { Box }  from '@mui/material';

function MainLocations() {
    return (
        <Container>
        <img src={picture} alt="" className="main-picture" />
        <Box className="locations-filters">
            <Input 
            type="text" 
            name="name-filter" 
            id="name-filter" 
            className='filter' 
            placeholder='Filter by name'
            sx={{ height: 56}} />
            <FormControl>
                <InputLabel id="select-types">Type</InputLabel>
                <Select 
                labelId="select-types"
                id="types-filter" 
                className='filter'
                label='Type'
                sx={{ height: 56, backgroundImage: "url('./assets/images/Vector.svg')"}}>
                    <MenuItem value="">Type</MenuItem>
                    <MenuItem value="">Type 2</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="select-dimensions">Dimension</InputLabel>
                <Select 
                labelId="select-dimension"
                id="dimension-filter" 
                className='filter'
                label='Dimension'
                sx={{ height: 56}}>
                    <MenuItem value="">Dimension</MenuItem>
                    <MenuItem value="">Dimension 2</MenuItem>
                </Select>
            </FormControl>

        </Box>
        </Container>
    )
}

export default MainLocations;