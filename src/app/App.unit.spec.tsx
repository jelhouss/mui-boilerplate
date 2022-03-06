import { render } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import BrandingProvider from "../BrandingProvider"
import App from "./App"
import store from "./store"

test("should render without crashing", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <BrandingProvider>
          <App />
        </BrandingProvider>
      </MemoryRouter>
    </Provider>
  )
})
