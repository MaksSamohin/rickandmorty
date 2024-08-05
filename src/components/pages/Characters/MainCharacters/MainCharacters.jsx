import { Container, Input, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import picture from '../../../../assets/images/rickandmorty.png'
import './MainCharacters.css';
import { Box }  from '@mui/material';

function MainCharacters() {
    return (
        <Container>
        <img src={picture} alt="" className="main-picture" />
        <Box className="filters">
            <Input 
            type="text" 
            name="name-filter" 
            id="name-filter" 
            className='filter' 
            placeholder='Filter by name'
            sx={{ height: 56}} />
            <FormControl>
                <InputLabel id="select-species">Species</InputLabel>
                <Select 
                labelId="select-species"
                id="species-filter" 
                className='filter'
                label='Species'
                sx={{ height: 56, backgroundImage: "url('./assets/images/Vector.svg')"}}>
                    <MenuItem value="">Species</MenuItem>
                    <MenuItem value="">Species 2</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="select-genders">Gender</InputLabel>
                <Select 
                labelId="select-gender"
                id="gender-filter" 
                className='filter'
                label='Gender'
                sx={{ height: 56}}>
                    <MenuItem value="">Gender</MenuItem>
                    <MenuItem value="">Gender 2</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="select-species">Status</InputLabel>
                    <Select 
                    labelId="select-status"
                    id="status-filter" 
                    className='filter'
                    label='Status'
                    sx={{ height: 56}}>
                        <MenuItem value="">Status</MenuItem>
                        <MenuItem value="">Status 2</MenuItem>
                    </Select>
            </FormControl>

        </Box>
        </Container>
    )
}

export default MainCharacters;