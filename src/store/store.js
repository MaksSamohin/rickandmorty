import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';
import locationsReducer from './locationsSlice';
import episodesReducer from './episodesSlice';


const store = configureStore({
        reducer: { characters: charactersReducer, 
                locations: locationsReducer, 
                episodes: episodesReducer }
})

export default store