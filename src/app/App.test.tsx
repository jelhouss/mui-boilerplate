import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"

import App from "./App"

test("should render without crashing", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )

  await waitForElementToBeRemoved(() => screen.queryByText(/application is refreshing/i))
})
