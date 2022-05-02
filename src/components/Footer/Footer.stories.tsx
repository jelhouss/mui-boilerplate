/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import items from "../../layouts/public/items/footer"
import Footer, { FooterProps } from "./Footer"

// use real routes to keep instead of custom ones
const routeEntries = items.map(({ items: subitems }) => subitems.map(({ path }) => path))

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Footers/Footer",
  component: Footer,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter initialEntries={routeEntries.flat()}>
          <BrandingProvider>
            <Story />
          </BrandingProvider>
        </MemoryRouter>
      </Provider>
    )
  ]
} as ComponentMeta<typeof Footer>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Footer> = (args: FooterProps) => <Footer {...args} />

export const Default = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  items
}
