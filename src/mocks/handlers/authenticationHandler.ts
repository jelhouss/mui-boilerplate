import { rest, PathParams } from "msw"

import HttpStatus from "../../shared/types/HttpStatus"
import AuthenticationPayload from "../../types/authentication/AuthenticationPayload"
import AuthenticationResponse from "../../types/authentication/AuthenticationResponse"
import { ValidDummyUser } from "../factories/userFactory"

const ROUTE = "/api/authenticate"

const authenticationHandler = (validDummyUsers: ValidDummyUser[]) => [
  rest.post<AuthenticationPayload, PathParams, AuthenticationResponse>(
    ROUTE,
    async (req, res, ctx) => {
      const { email, password } = req.body

      if (!email || !password) return res(ctx.status(HttpStatus.BAD_REQUEST))

      const randomAuthenticatedUser = validDummyUsers.find(({ user }) => user.email === email)

      if (!randomAuthenticatedUser) return res(ctx.status(HttpStatus.UNAUTHORIZED))

      return res(ctx.status(HttpStatus.OK), ctx.json(randomAuthenticatedUser))
    }
  )
]

export default authenticationHandler
