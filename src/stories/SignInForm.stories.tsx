/* eslint-disable react/jsx-props-no-spreading */
import React from "react"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import SignInForm, { SignInFormProps } from "../components/SignInForm"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Forms/SignInForm",
  component: SignInForm,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof SignInForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SignInForm> = (args: SignInFormProps) => (
  <SignInForm {...args} />
)

export const Default = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
