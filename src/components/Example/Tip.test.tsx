import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import Tip from "./Tip"
import exampleFactory, { initialTipExample } from "../../mocks/factories/exampleFactory"
import useGetTipsExample, { useTipExample } from "../../services/queries/exampleQuery"

const exampleUser = exampleFactory.build()

const useGetTipsExampleMock = useGetTipsExample as jest.Mock
const useTipExampleMock = useTipExample as jest.Mock
const addTipMock = jest.fn()

// Mock the module
jest.mock("../../services/queries/exampleQuery")

beforeEach(() => {
  useGetTipsExampleMock.mockImplementation(() => ({ isLoading: true }))
  useTipExampleMock.mockImplementation(() => ({ mutate: addTipMock }))
})
afterEach(() => {
  jest.clearAllMocks()
})

it("should render and match snapshot", () => {
  const { asFragment } = render(<Tip currentUser={exampleUser} />)
  const fragment = asFragment()

  expect(fragment).toMatchSnapshot()
})

it("should display greeting", () => {
  render(<Tip currentUser={exampleUser} />)

  const text = `Hey ${exampleUser.firstName}`

  const greet = screen.getByRole("heading", { level: 2, name: new RegExp(text, "i") })

  expect(greet).toBeInTheDocument()
})

describe("when reading tips", () => {
  it("should start loading tips", () => {
    render(<Tip currentUser={exampleUser} />)

    const loadingText = screen.getByText(/loading.../i)

    expect(loadingText).toBeInTheDocument()
  })

  it("should get tips and list them", () => {
    useGetTipsExampleMock.mockImplementation(() => ({ isLoading: false, data: initialTipExample }))

    render(<Tip currentUser={exampleUser} />)

    const { user, tip } = initialTipExample[0]

    const itemText = `${user.firstName} has submitted ${tip} dollars`

    const item = screen
      .getAllByRole("listitem")
      .find((listitem) => listitem.textContent === itemText)

    expect(item).toBeInTheDocument()
  })
})

describe("when adding tips", () => {
  describe("when validating input", () => {
    it("should not accept a tip lower than 5", async () => {
      useGetTipsExampleMock.mockImplementation(() => ({
        isLoading: false,
        data: initialTipExample
      }))

      render(<Tip currentUser={exampleUser} />)

      const tipToAdd = 2

      const submitButton = screen.getByRole("button", { name: /add tip/i })
      const tipInput = screen.getByLabelText(/tip/i)

      fireEvent.change(tipInput, { target: { value: tipToAdd } })

      fireEvent.click(submitButton)

      await waitFor(() => {
        const errorTipValidationMessage = screen.getByText(/tip must be higher than 5/i)
        expect(errorTipValidationMessage).toBeInTheDocument()
      })
    })
  })

  it("should add a tip", async () => {
    useGetTipsExampleMock.mockImplementation(() => ({ isLoading: false, data: initialTipExample }))

    render(<Tip currentUser={exampleUser} />)

    const tipToAdd = 10

    const submitButton = screen.getByRole("button", { name: /add tip/i })
    const tipInput = screen.getByLabelText(/tip/i)

    fireEvent.change(tipInput, { target: { value: tipToAdd } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(addTipMock).toHaveBeenCalledTimes(1)

      // following `no-wait-for-multiple-assertions` rule does not make sense because the two operations are linked to each other
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(addTipMock).toHaveBeenCalledWith({ user: exampleUser, tip: tipToAdd })
    })
  })

  it("should display a successful message on adding tips", () => {
    useGetTipsExampleMock.mockImplementation(() => ({ isLoading: false, data: initialTipExample }))
    useTipExampleMock.mockImplementation(() => ({ isSuccess: true }))

    render(<Tip currentUser={exampleUser} />)

    const addTipSuccessText = screen.getByText(/tip added!/i)
    expect(addTipSuccessText).toBeInTheDocument()
  })
})
