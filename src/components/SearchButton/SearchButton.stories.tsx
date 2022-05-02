/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Provider } from "react-redux"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import SearchButton, { SearchButtonProps } from "./SearchButton"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Buttons/SearchButton",
  component: SearchButton,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onOpen: { action: "onOpen" },
    onClose: { action: "onClose" },
    onSearch: { action: "onSearch" }
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrandingProvider>
          <Story />
        </BrandingProvider>
      </Provider>
    )
  ]
} as ComponentMeta<typeof SearchButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchButton> = (args: SearchButtonProps) => (
  <SearchButton {...args} />
)

export const Default = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
