import { Card, CardContent, CardMedia, Container, Typography, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import './CharList.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, selectFilers, loadMoreCharacters } from '../../store/createSlice';

function CharList() {
    const INITIAL_LOAD = 8;
    const LOAD_MORE_COUNT = 4;
    
    const dispatch = useDispatch();
    const { characters, status, error, limit, page} = useSelector(state => state.characters)
    const filters = useSelector(selectFilers);
    const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);

    useEffect(() => {
        if (status === 'idle' || status === 'succeeded') {
            dispatch(fetchCharacters({filters, page, limit}));
        }   
    }, [filters, dispatch, limit])

    useEffect(() => {
        setVisibleCount(INITIAL_LOAD);
    }, [filters]);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + LOAD_MORE_COUNT)
    }
    console.log("Characters:", characters);
    return (
        <Container>
            <Box className="charlist">
                {characters 
                    ? characters.slice(0, visibleCount).map((item, index) => {
                        return (
                        <Card key={item.id} sx={{minWidth: 240}}>
                            <CardContent>
                            <CardMedia
                                component="img"
                                image={item.image}
                                alt={item.name}
                                sx={{width: '100%', height: '140px'}}
                            />
                                <Typography variant='h6'>{item.name}</Typography>
                                <Typography>{item.species}</Typography>
                            </CardContent>
                        </Card>
                        )
                    })
                    : <Box>Данных нет</Box>
                }
            </Box>
            <Button onClick={() => handleLoadMore()} sx={{ margin: '0 auto', display: 'block'}}>Load more</Button>
        </Container>
    )
}

export default CharList;