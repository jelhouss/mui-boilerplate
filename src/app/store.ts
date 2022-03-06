import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"

import authenticationReducer from "../slices/authentication"
import registrationReducer from "../slices/registration"
import themeReducer from "../slices/theme"

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    registration: registrationReducer,
    theme: themeReducer
  }
})

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// types
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
