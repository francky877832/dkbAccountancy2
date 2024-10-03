import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favourites/favouritesSlice';
import basketReducer from './baskets/basketsSlice';
import notificationsReducer from './notifications/notificationsSlice';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    basket: basketReducer,
    notifications : notificationsReducer
  },
});
