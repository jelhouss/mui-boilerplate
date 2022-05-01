/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Provider } from "react-redux"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import Page, { PageProps } from "./Page"

export default {
  title: "Page",
  component: Page,

  argTypes: {},
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrandingProvider>
          <Story />
        </BrandingProvider>
      </Provider>
    )
  ]
} as ComponentMeta<typeof Page>

const Template: ComponentStory<typeof Page> = (args: PageProps) => <Page {...args} />

export const Default = Template.bind({})

Default.args = {
  title: "Hello World",
  children: <p>This is some random content!</p>
}
