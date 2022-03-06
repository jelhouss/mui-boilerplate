/* eslint-disable no-param-reassign */
import { PaletteMode } from "@mui/material"
import { createSlice } from "@reduxjs/toolkit"

export interface ThemeState {
  mode: PaletteMode
}

const initialState: ThemeState = {
  mode: "light"
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleTheme(state) {
      if (state.mode === "dark") {
        state.mode = "light"
      } else {
        state.mode = "dark"
      }
    }
  }
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
