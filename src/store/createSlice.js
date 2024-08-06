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
        filters: {
            name: '',
            species: '',
            gender: '',
            status: '',
        },
        sortField: '',
        sortValue: '',
    },
    reducers: {
        loadMoreCharacters(state) {
            state.page += 1
        },
        setFilters(state, action) {
            state.filters = {...state.filters, ...action.payload}
            state.page = 1;
        },
        sortCharacters(state, action) {
            const { sortField, sortValue } = action.payload;
            state.sortField = sortField;
            state.sortValue = sortValue;
            state.characters = state.characters.slice().sort((a, b) => {
                if (a[sortField] === sortValue && b[sortField] !== sortValue) {
                    return -1;
                }
                if (a[sortField] !== sortValue && b[sortField] === sortValue) {
                    return 1;
                }
                return 0;
            });
        }
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


export default charactersSlice.reducer;