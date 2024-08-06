import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async ({filters, limit, page, thunkAPI}) => {
        const query = new URLSearchParams({...filters, limit, page}).toString();
        const response = await fetch(`https://rickandmortyapi.com/api/character?${query}`);
        const data = await response.json();
        return data.results;
    }
)

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        characters: [],
        status: 'idle',
        page: 1,
        limit: 8,
        error: null,
        filters: {
            name: '',
            species: '',
            gender: '',
            status: '',
        }
    },
    reducers: {
        loadMoreCharacters(state) {
            state.page += 1
        },
        setFilters(state, action) {
            state.filters = {...state.filters, ...action.payload}
            state.page = 1;
            state.characters = [];
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
                state.characters = action.payload
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



export const { loadMoreCharacters, setFilters } = charactersSlice.actions;
export const selectFilters = state => state.characters.filters
export const selectCharacters = state => state.characters.characters
export const selectStatus= state => state.characters.status

export default charactersSlice.reducer;