import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        visible: false,
    },
    reducers: {
        setVisibility(state, action) {
            console.log('setLoading', { payload: action.payload });
            state.visible = action.payload.visible;
        },
    },
});

export const { setVisibility } = drawerSlice.actions;
export default drawerSlice.reducer;
