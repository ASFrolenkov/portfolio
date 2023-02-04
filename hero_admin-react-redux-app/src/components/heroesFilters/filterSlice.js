import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    selectedFilter: 'all'
})

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
)

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterSelect: (state, action) => {state.selectedFilter = action.payload}
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filterAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filterSlice;

export const {selectAll} = filterAdapter.getSelectors(state => state.filters)

export default reducer;

export const {
    filterSelect
} = actions;