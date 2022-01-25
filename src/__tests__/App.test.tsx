import { render } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"

import App from "../app/App"

test("should render without crashing", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
})
