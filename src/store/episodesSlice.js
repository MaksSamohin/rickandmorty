import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchEpisodes = createAsyncThunk(
    "episodes/fetchEpisodes",
    async ({ page = 1, filters }, { getState }) => {
      const state = getState();
      const currentPage = state.episodes.page || page;
      const queryParams = new URLSearchParams({
        page: currentPage,
        name: filters.name || "",
        episode: filters.episode || "",
      }).toString();
  
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/?${queryParams}`
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

  export const fetchEpisode = async (id) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode/${id}`
    );
  
    if (!response.ok) {
      throw new Error("Response error");
    }
  
    const data = await response.json();
    return data;
  };
  
  const initialState = {
    episodes: [],
    status: "idle",
    page: 0,
    maxPage: 0,
    error: null,
    hasMore: true,
    loadingEpisodes: false,
    filters: JSON.parse(localStorage.getItem("episodesFilters")) || {
      name: "",
      episode: "",
    },
  };
  
  const episodesSlice = createSlice({
    name: "episodes",
    initialState,
    reducers: {
      loadMoreEpisodes(state) {
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
        state.episodes = [];
      },
      updateEpisodes(state, action) {
        if (action.payload) {
          const newEpisodes = action.payload.results;
          const uniqueEpisodes = newEpisodes.filter(
            (newEp) => !state.episodes.some((ep) => ep.id === newEp.id)
          );
          state.episodes = [...state.episodes, ...uniqueEpisodes];
          state.hasMore = !!action.payload.info.next;
          state.maxPage = action.payload.info.pages;
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchEpisodes.pending, (state) => {
          state.loadingEpisodes = true;
          state.status = "loading";
        })
        .addCase(fetchEpisodes.fulfilled, (state, action) => {
          state.loadingEpisodes = false;
          state.error = null;
  
          const fetchedEpisodes = action.payload.results;
  
          const uniqueEpisodes = fetchedEpisodes.filter(
            (newEp) => !state.episodes.some((ep) => ep.id === newEp.id)
          );
  
          state.episodes = [...state.episodes, ...uniqueEpisodes];
          state.hasMore =
            !!action.payload.info.next && state.page < state.maxPage;
          state.maxPage = action.payload.info.pages;
  
          state.status = "succeeded";
        })
        .addCase(fetchEpisodes.rejected, (state, action) => {
          state.status = "failed";
          state.loadingEpisodes = false;
          state.error = action.error.message;
        });
    },
  });
  
  export const { loadMoreEpisodes, setFilters, updateEpisodes } =
    episodesSlice.actions;
  export const selectFilters = (state) => state.episodes.filters;
  export const selectEpisodes = (state) => state.episodes.episodes;
  export const selectStatus = (state) => state.episodes.status;
  export const selectPage = (state) => state.episodes.page;
  export const episodesLoading = (state) => state.episodes.loadingEpisodes;
  
  export default episodesSlice.reducer;
  