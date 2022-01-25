// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from "@faker-js/faker"
// eslint-disable-next-line import/no-extraneous-dependencies
import { PathParams, rest } from "msw"

import { AuthenticationResponse as AuthenticatedUser } from "../types/authentication"
import { RegistrationPayload, RegistrationResponse } from "../types/registration"
import { User } from "../types/user"
import generateUser from "./faker/user"

const REGISTER_ROUTE = "/api/register"

// please note that `AuthenticatedUser` is used here just for testing.
// we just want to simulate a response for existing users.
const registration = (randomUsers: AuthenticatedUser[]) => [
  // POST /api/register
  rest.post<RegistrationPayload, PathParams, RegistrationResponse>(
    REGISTER_ROUTE,
    async (req, res, ctx) => {
      const payload = req.body

      const { email, firstName, lastName, gender, monthOfBirth, dayOfBirth, yearOfBirth } = payload

      const existingUser = randomUsers.find(({ user }) => user.email === email)

      if (existingUser) return res(ctx.status(409))

      const user: User = generateUser({
        email,
        firstName,
        lastName,
        gender,
        monthOfBirth,
        dayOfBirth,
        yearOfBirth
      })

      const token = faker.random.alphaNumeric(32)

      randomUsers.push({ user, token })

      return res(ctx.status(201), ctx.json({ user }))
    }
  )
]

export default registration
