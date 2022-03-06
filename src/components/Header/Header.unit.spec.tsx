import { render } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import profileAvatarPopperItems from "../../layouts/protected/items/profileAvatarPopperItems"
import items from "../../layouts/public/items/navigation"
import userFactory from "../../mocks/factories/userFactory"
import Header from "./Header"

// use real routes to keep instead of custom ones
const routeEntries = items.map(({ path }) => path)

const setup = () => {
  const user = userFactory.build({
    email: "random@email.com"
  })
  const onSignOut = jest.fn()
  const onProfileAvatarPopperItemClick = jest.fn()
  const onHeaderSearchClose = jest.fn()
  const onHeaderSearchOpen = jest.fn()
  const onHeaderSearch = jest.fn()

  const ui = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={routeEntries}>
        <BrandingProvider>
          <Header
            items={items}
            profileAvatarPopperItems={profileAvatarPopperItems}
            user={user}
            onProfileAvatarPopperItemClick={onProfileAvatarPopperItemClick}
            onHeaderSearchClose={onHeaderSearchClose}
            onHeaderSearchOpen={onHeaderSearchOpen}
            onHeaderSearch={onHeaderSearch}
          />
        </BrandingProvider>
      </MemoryRouter>
    </Provider>
  )

  return {
    ...ui,
    user,
    onSignOut,
    onProfileAvatarPopperItemClick,
    onHeaderSearchClose,
    onHeaderSearchOpen,
    onHeaderSearch
  }
}

test("should render without crashing", () => {
  setup()
})
