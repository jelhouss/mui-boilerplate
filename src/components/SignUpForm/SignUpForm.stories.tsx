/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Provider } from "react-redux"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import SignUpForm, { SignUpFormProps } from "./SignUpForm"

export default {
  title: "Forms/SignUpForm",
  component: SignUpForm,

  argTypes: {
    onSubmit: { action: "onSubmit" }
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
} as ComponentMeta<typeof SignUpForm>

const Template: ComponentStory<typeof SignUpForm> = (args: SignUpFormProps) => (
  <SignUpForm {...args} />
)

export const Default = Template.bind({})

Default.args = {}
