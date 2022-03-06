import { render } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import items from "../../layouts/protected/items/navigation"
import SideNavigation from "./SideNavigation"

// use real routes to keep instead of custom ones
const routeEntries = items.map(({ path }) => path)

const setup = () => {
  const ui = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={routeEntries}>
        <BrandingProvider>
          <SideNavigation items={items} />
        </BrandingProvider>
      </MemoryRouter>
    </Provider>
  )

  return { ...ui }
}

test("should render without crashing", () => {
  setup()
})
