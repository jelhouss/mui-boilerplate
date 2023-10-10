import { faker } from "@faker-js/faker"
import { rest, PathParams } from "msw"

import HttpStatus from "../../shared/types/HttpStatus"
import User from "../../shared/types/User"
import RegistrationPayload from "../../types/registration/RegistrationPayload"
import RegistrationResponse from "../../types/registration/RegistrationResponse"
import userFactory, { ValidDummyUser } from "../factories/userFactory"

const ROUTE = "/api/register"

const registrationHandler = (validDummyUsers: ValidDummyUser[]) => [
  rest.post<RegistrationPayload, PathParams, RegistrationResponse>(ROUTE, async (req, res, ctx) => {
    const payload = req.body

    const { email, firstName, lastName, gender } = payload

    const existingUser = validDummyUsers.find(({ user }) => user.email === email)

    if (existingUser) return res(ctx.status(HttpStatus.CONFLICT))

    const user: User = userFactory.build({
      email,
      firstName,
      lastName,
      gender
    })

    const token = faker.string.alphanumeric(32)

    validDummyUsers.push({ user, token })

    return res(ctx.status(HttpStatus.CREATED), ctx.json({ user }))
  })
]

export default registrationHandler
