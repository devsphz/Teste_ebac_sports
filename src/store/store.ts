// importando
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './carrinhoSlice'
import { apiSlice } from './apiSlice'
// reducers
const store = configureStore({
  reducer: {
    carrinho: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
