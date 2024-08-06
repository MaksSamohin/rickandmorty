import { Container, Input, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import picture from '../../../../assets/images/rickandmorty.png'
import './MainCharacters.css';
import { Box }  from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, selectFilers } from '../../../../store/createSlice';

function MainCharacters() {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilers)
    const handleChange = (name, value) => {
        dispatch(setFilters({ [name]:value }));
    }


    return (
        <Container>
        <img src={picture} alt="" className="main-picture" />
        <Box className="filters">
            <Input 
            onChange={(e) => handleChange('name', e.target.value)}
            value={filters.name}
            type="text" 
            name="name" 
            id="name" 
            className='filter' 
            placeholder='Filter by name'
            sx={{ height: 56}} />
            <FormControl>
                <InputLabel id="select-species">Species</InputLabel>
                <Select 
                value={filters.species}
                onChange={(e) => handleChange('species', e.target.value)}
                labelId="select-species"
                id="species" 
                className='filter'
                label='Species'
                sx={{ height: 56, backgroundImage: "url('./assets/images/Vector.svg')"}}>
                    <MenuItem value="">Species</MenuItem>
                    <MenuItem value="Human">Human</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="select-genders">Gender</InputLabel>
                <Select 
                value={filters.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                labelId="select-gender"
                id="gender" 
                className='filter'
                label='Gender'
                sx={{ height: 56}}>
                    <MenuItem value="">Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="select-species">Status</InputLabel>
                    <Select 
                    value={filters.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    labelId="select-status"
                    id="status" 
                    className='filter'
                    label='Status'
                    sx={{ height: 56}}>
                        <MenuItem value="">Status</MenuItem>
                        <MenuItem value="Dead">Dead</MenuItem>
                        <MenuItem value="Alive">Alive</MenuItem>
                    </Select>
            </FormControl>
        </Box>
        </Container>
    )
}

export default MainCharacters;