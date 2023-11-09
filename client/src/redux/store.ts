import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import tasksReducer from './slices/tasks';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
