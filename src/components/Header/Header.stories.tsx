/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import profileAvatarPopperItems from "../../layouts/protected/items/profileAvatarPopperItems"
import items from "../../layouts/public/items/navigation"
import userFactory from "../../mocks/factories/userFactory"
import Header, { HeaderProps } from "./Header"

// use real routes to keep instead of custom ones
const routeEntries = items.map(({ path }) => path)

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Header/Header",
  component: Header,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onHeaderSearchClose: { action: "onHeaderSearchClose" },
    onHeaderSearchOpen: { action: "onHeaderSearchOpen" },
    onHeaderSearch: { action: "onHeaderSearch" },
    onProfileAvatarPopperItemClick: { action: "onProfileAvatarPopperItemClick" },
    onSignOut: { action: "onSignOut" }
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter initialEntries={routeEntries}>
          <BrandingProvider>
            <Story />
          </BrandingProvider>
        </MemoryRouter>
      </Provider>
    )
  ]
} as ComponentMeta<typeof Header>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = (args: HeaderProps) => <Header {...args} />

export const Default = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  items,
  profileAvatarPopperItems,
  user: userFactory.build({
    email: "random@email.com"
  })
}
