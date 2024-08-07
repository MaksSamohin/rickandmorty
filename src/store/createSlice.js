import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async ({filters, page = 1}, { getState }) => {
        const state = getState();
        const currentPage = state.characters.page || page
        const query = new URLSearchParams({page: currentPage, ...filters}).toString();
        const response = await fetch(`https://rickandmortyapi.com/api/character?${query}`);
        const data = await response.json();
        console.log(query)
        return data.results;
    }
)

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        characters: [],
        filteredCharacters: [],
        status: 'idle',
        page: 1,
        error: null,
        filters: JSON.parse(localStorage.getItem('filters')) || {
            name: '',
            species: '',
            gender: '',
            status: '',
        },
        availableFilters: {
            species: [],
            gender: [],
            status: [],
        },
    },
    reducers: {
        loadMoreCharacters(state) {
            state.page += 1
        },
        setFilters(state, action) {
            state.filters = {...state.filters, ...action.payload}
            state.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCharacters.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCharacters.fulfilled, (state, action) => {
            state.status = 'succeeded';
            if (state.page === 1) {
                state.characters = action.payload;
            } else {
                state.characters = [...state.characters, ...action.payload];
            }

            const newSpecies = new Set(state.availableFilters.species);
            const newGender = new Set(state.availableFilters.gender);
            const newStatus= new Set(state.availableFilters.status);

            if (Array.isArray(action.payload)) {
                action.payload.forEach((item) => {
                    newSpecies.add(item.species)
                    newGender.add(item.gender)
                    newStatus.add(item.status)
                })
            }

            state.availableFilters = {
                species: Array.from(newSpecies),
                gender: Array.from(newGender),
                status: Array.from(newStatus),
            }
        })
        .addCase(fetchCharacters.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        })
    } 
})



export const { loadMoreCharacters, setFilters, sortCharacters } = charactersSlice.actions;
export const selectFilters = state => state.characters.filters
export const selectCharacters = state => state.characters.characters
export const selectStatus= state => state.characters.status
export const selectPage= state => state.characters.page
export const selectAvailableFilters = state => state.characters.availableFilters


export default charactersSlice.reducer;