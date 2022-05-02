import { render } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import SearchButton from "./SearchButton"

const setup = () => {
  const onOpen = jest.fn()
  const onClose = jest.fn()
  const onSearch = jest.fn()

  const ui = render(
    <Provider store={store}>
      <BrandingProvider>
        <SearchButton onOpen={onOpen} onClose={onClose} onSearch={onSearch} />
      </BrandingProvider>
    </Provider>
  )

  return { ...ui, onOpen, onClose, onSearch }
}

test("should render without crashing", () => {
  setup()
})
