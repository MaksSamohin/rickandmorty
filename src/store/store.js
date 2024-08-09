import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';
import locationsReducer from './locationsSlice'

const store = configureStore({
        reducer: { characters: charactersReducer, locations: locationsReducer }
})

export default store