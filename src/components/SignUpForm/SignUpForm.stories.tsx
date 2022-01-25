/* eslint-disable react/jsx-props-no-spreading */
import React from "react"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import SignUpForm, { SignUpFormProps } from "./SignUpForm"

export default {
  title: "Forms/SignUpForm",
  component: SignUpForm,

  argTypes: {}
} as ComponentMeta<typeof SignUpForm>

const Template: ComponentStory<typeof SignUpForm> = (args: SignUpFormProps) => (
  <SignUpForm {...args} />
)

export const Default = Template.bind({})

Default.args = {}
