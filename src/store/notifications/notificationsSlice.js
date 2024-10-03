// basketSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BACKEND } from '@env';
import { server } from '../../remote/server';
import { useDispatch } from 'react-redux';
import { startTransition } from 'react';

// Initial state
const initialState = {
  notifications : {}
};

// Slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updateNotifications: (state, action) => {
      const { name, id } = action.payload;

      const updatedNotifications = {
        ...state.notifications,
        [name] :  id
      }
      //console.log( state.notifications)
      state.notifications = updatedNotifications
    },

    
  },
 /* 
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBasket.pending, (state) => {
        state.isLoading = true;
      }); 
  },
  */
});




// Selectors
export const selectNotifications = (state) => state.notifications.notifications;


export const { updateNotifications,  } = notificationsSlice.actions;
export default notificationsSlice.reducer;
