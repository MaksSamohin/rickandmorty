import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchLocations = createAsyncThunk(
    "locations/fetchLocations",
    async ({ page = 1, filters }, { getState }) => {
      const state = getState();
      const currentPage = state.locations.page || page;
      const queryParams = new URLSearchParams({
        ...filters,
        page: currentPage,
      }).toString();
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/?${queryParams}`
      );
  
      if (!response.ok) {
        throw new Error("Response error");
      }
  
      const data = await response.json();
  
      return {
        results: data.results,
        info: data.info,
      };
    }
  );
  
  export const fetchLocation = createAsyncThunk(
    "locations/fetchLocation",
    async (id) => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/${id}`
      );
  
    if (!response.ok) {
      throw new Error("Response error");
    }
  
    const data = await response.json();
    return data;
  }
)
  
  const initialState = {
    locations: [],
    status: "idle",
    page: 0,
    maxPage: 0,
    error: null,
    hasMore: true,
    loadingLocations: false,
    filters: JSON.parse(localStorage.getItem("locationsFilters")) || {
      name: "",
      dimension: "",
      type: "",
    },
    availableFilters: {
        dimension: [],
        type: [],
    },
  };

  const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        loadMoreLocations(state) {
            if (state.hasMore === true && state.page < state.maxPage) {
                state.page += 1;
              } else {
                state.hasMore = false;
              }
        },
        setFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload };
            state.page = 1;
            state.hasMore = true;
            state.locations = [];
        },
        updateLocations(state, action) {
            if (action.payload) {
              const newLocations = action.payload.results;
              const uniqueLocations = newLocations.filter(
                (newLoc) => !state.locations.some((loc) => loc.id === newLoc.id)
              );
              state.locations = [...state.locations, ...uniqueLocations];
              state.hasMore = !!action.payload.info.next;
              state.maxPage = action.payload.info.pages;
            }
          },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchLocations.pending, (state) => {
            state.loadingLocations = true;
            state.status = "loading";
          })
          .addCase(fetchLocations.fulfilled, (state, action) => {
            state.loadingLocations = false;
            state.error = null;
    
            const fetchedLocations = action.payload.results;
    
            const currentDimension = state.filters.dimension;
            const currentType = state.filters.type;
    
            const newDimension = new Set(state.availableFilters.dimension);
            const newType = new Set(state.availableFilters.type);
    
            if (Array.isArray(fetchedLocations)) {
                fetchedLocations.forEach((item) => {
                if (!currentDimension || item.dimension === currentDimension) {
                    newDimension.add(item.dimension);
                }
                if (!currentType || item.type === currentType) {
                    newType.add(item.type);
                }
              });
            } else {
              console.error("Received non-iterable data:", fetchedLocations);
            }
    
            state.availableFilters = {
              type: Array.from(newType),
              dimension: Array.from(newDimension),
            };
    
            const uniqueLocations = fetchedLocations.filter(
              (newLoc) => !state.locations.some((loc) => loc.id === newLoc.id)
            );
    
            state.locations = [...state.locations, ...uniqueLocations];
            state.hasMore =
              !!action.payload.info.next && state.page < state.maxPage;
            state.maxPage = action.payload.info.pages;
    
            state.status = "succeeded";
          })
    
          .addCase(fetchLocations.rejected, (state, action) => {
            state.status = "failed";
            state.loadingLocations = false;
            state.error = action.error.message;
  console.log(action.error.message)

          });
      },
  });
export const { loadMoreLocations, setFilters, updateLocations } = locationsSlice.actions;
export const selectFilters = (state) => state.locations.filters;
export const selectLocations = (state) => state.locations.locations;
export const selectStatus = (state) => state.locations.status;
export const selectPage = (state) => state.locations.page;
export const selectAvailableFilters = (state) =>
  state.locations.availableFilters;
export const locationsLoading = (state) => state.locations.loadingLocations;

export default locationsSlice.reducer;