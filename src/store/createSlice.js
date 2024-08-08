import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async ({ page = 1}, { getState }) => {
        const state = getState();
        const currentPage = state.characters.page || page
        const query = new URLSearchParams({page: currentPage}).toString();
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
        error: null,
        hasMore: true,
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
            const fetchedCharacters = action.payload;

            if (!Array.isArray(fetchedCharacters)) {
                state.hasMore = false;
            } else {
                state.hasMore = true
            }
           
            if (state.page === 1) {
                state.characters = fetchedCharacters;
            } else if (state.hasMore === true) {
                console.log(state.characters)
                state.characters = [...state.characters, ...fetchedCharacters];
                console.log(state.characters)
            }
            const currentSpecies = state.filters.species;
            const currentGender = state.filters.gender;
            const currentStatus = state.filters.status;

            const newSpecies = new Set(state.availableFilters.species);
            const newGender = new Set(state.availableFilters.gender);
            const newStatus = new Set(state.availableFilters.status);

            if (Array.isArray(action.payload)) {
                action.payload.forEach((item) => {
                    if (!currentSpecies || item.species === currentSpecies) {
                        newSpecies.add(item.species);
                    }
                    if (!currentGender || item.gender === currentGender) {
                        newGender.add(item.gender);
                    }
                    if (!currentStatus || item.status === currentStatus) {
                        newStatus.add(item.status);
                    }
                });
            } else {
                console.error('Received non-iterable data:', action.payload);
            }

            state.availableFilters = {
                species: Array.from(newSpecies),
                gender: Array.from(newGender),
                status: Array.from(newStatus),
            }

            state.status = 'succeeded';

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