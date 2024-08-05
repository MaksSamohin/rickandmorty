import { Card, CardContent, CardMedia, Container, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import fetchAllCards from '../../service/fetch';
import './CharList.css';

function CharList() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchAllCards().then((data) => setCards(data) )
    }, [])
    return (
        <Container>
            <Box className="charlist">
                {cards ? cards.map((item, index) => {
                    <Card key={index} sx={{minWidth: 240}}>
                    <CardContent>
                        <Typography variant='h6'>Rick Sanchez</Typography>
                        <Typography>Human</Typography>
                    </CardContent>
                </Card>
                }) : null}
            </Box>
        </Container>
    )
}

export default CharList;