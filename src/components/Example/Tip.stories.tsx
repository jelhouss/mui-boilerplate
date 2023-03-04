import { expect } from "@storybook/jest"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import { userEvent, waitFor, within } from "@storybook/testing-library"

import Tip, { TipProps } from "./Tip"
import exampleFactory from "../../mocks/factories/exampleFactory"

const exampleUser = exampleFactory.build()

// More on default export:
// See: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Tip",
  component: Tip,

  // More on argTypes:
  // See: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof Tip>

// More on component templates:
// See: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tip> = (args: TipProps) => <Tip {...args} />

export const Default = Template.bind({})

// More on args:
// See: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  currentUser: exampleUser
}

// More on interactions, testing and play function:
// See: https://storybook.js.org/docs/react/writing-stories/play-function
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const text = `Hey ${exampleUser.firstName}`
  const greet = canvas.getByRole("heading", { level: 2, name: new RegExp(text, "i") })
  expect(greet).toBeInTheDocument()
}

export const AddTipSuccess = Template.bind({})

AddTipSuccess.args = {
  currentUser: exampleUser
}

AddTipSuccess.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const tipToAdd = "10"

  const submitButton = canvas.getByRole("button", { name: /add tip/i })
  const tipInput = canvas.getByLabelText(/tip/i)

  userEvent.type(tipInput, tipToAdd)

  userEvent.click(submitButton)

  await waitFor(
    () => {
      const addTipSuccessText = canvas.getByText(/tip added!/i)
      expect(addTipSuccessText).toBeInTheDocument()
    },
    { timeout: 3000 }
  )
}

export const ValidateTipLowerThanFive = Template.bind({})

ValidateTipLowerThanFive.args = {
  currentUser: exampleUser
}

ValidateTipLowerThanFive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const tipToAdd = "2"

  const submitButton = canvas.getByRole("button", { name: /add tip/i })
  const tipInput = canvas.getByLabelText(/tip/i)

  userEvent.type(tipInput, tipToAdd)

  userEvent.click(submitButton)

  await waitFor(
    () => {
      const errorTipValidationMessage = canvas.getByText(/tip must be higher than 5/i)
      expect(errorTipValidationMessage).toBeInTheDocument()
    },
    { timeout: 3000 }
  )
}
