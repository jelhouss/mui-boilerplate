import { rest, PathParams, DefaultBodyType } from "msw"

import HttpStatus from "../../shared/types/HttpStatus"
import GetMeResponse from "../../types/authentication/GetMeResponse"
import { ValidDummyUser } from "../factories/userFactory"

const ROUTE = "/api/user"

const userHandler = (validDummyUsers: ValidDummyUser[]) => [
  rest.get<DefaultBodyType, PathParams, GetMeResponse>(`${ROUTE}/me`, async (req, res, ctx) => {
    const authorizationHeader = req.headers.get("authorization")

    const authenticatedUser = validDummyUsers.find(
      ({ token }) => authorizationHeader === `Bearer ${token}`
    )

    if (!authenticatedUser) return res(ctx.status(HttpStatus.UNAUTHORIZED))

    const { user } = authenticatedUser

    return res(ctx.status(HttpStatus.OK), ctx.json({ user }))
  })
]

export default userHandler
