import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Task } from '../../types/common';

interface taskState {
    value: Task[];
}

const initialState: taskState = { value: [] };

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.value = [...action.payload];
        },
        clearTasks: state => {
            state.value.splice(0, state.value.length);
        },
    },
});

export const { setTasks, clearTasks } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.value;
export default tasksSlice.reducer;
