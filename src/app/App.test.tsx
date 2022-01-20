import { render } from "@testing-library/react"
import React from "react"

import App from "./App"

test("should render without crashing", () => {
  render(<App />)
})
