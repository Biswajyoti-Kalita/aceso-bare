import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const splashSlice = createSlice({
    name: 'splash',
    initialState: {
        isLoading: true,
    },
    reducers: {
        setLoading(state, action) {
            console.log('setLoading', { payload: action.payload });
            state.isLoading = action.payload.isLoading;
        },
    },
});

export const { setLoading } = splashSlice.actions;
export default splashSlice.reducer;
