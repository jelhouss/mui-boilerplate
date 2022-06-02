// eslint-disable-next-line import/no-extraneous-dependencies
import { DefaultBodyType, PathParams, rest } from "msw"

import {
  AuthenticationPayload,
  AuthenticationResponse as AuthenticatedUser,
  AuthenticationResponse,
  RefreshAuthenticationResponse
} from "../../../types/authentication"

const AUTHENTICATE_ROUTE = "/api/authenticate"

const authentication = (randomUsers: AuthenticatedUser[]) => [
  // POST /api/authenticate
  rest.post<AuthenticationPayload, PathParams, AuthenticationResponse>(
    AUTHENTICATE_ROUTE,
    async (req, res, ctx) => {
      const { email, password } = req.body

      if (!email || !password) return res(ctx.status(400))

      const randomAuthenticatedUser = randomUsers.find(({ user }) => user.email === email)

      if (!randomAuthenticatedUser) return res(ctx.status(401))

      return res(ctx.status(200), ctx.json(randomAuthenticatedUser))
    }
  ),

  // GET /api/authenticate/refresh
  rest.get<DefaultBodyType, PathParams, RefreshAuthenticationResponse>(
    `${AUTHENTICATE_ROUTE}/refresh`,
    async (req, res, ctx) => {
      const header = req.headers.get("authorization")

      const authenticatedUser = randomUsers.find(({ token }) => header === `Bearer ${token}`)

      if (!header || !authenticatedUser) return res(ctx.status(401))

      const { user } = authenticatedUser
      return res(ctx.status(200), ctx.json({ user }))
    }
  )
]

export default authentication
