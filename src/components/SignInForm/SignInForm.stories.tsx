/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Provider } from "react-redux"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import SignInForm, { SignInFormProps } from "./SignInForm"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Forms/SignInForm",
  component: SignInForm,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
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
} as ComponentMeta<typeof SignInForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SignInForm> = (args: SignInFormProps) => (
  <SignInForm {...args} />
)

export const Default = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
