import { DefaultBodyType, PathParams, rest } from "msw"

import HttpStatus from "../../shared/types/HttpStatus"
import ExamplePayload from "../../types/example/ExamplePayload"
import ExampleResponse from "../../types/example/ExampleResponse"

const ROUTE = "/api/example/tip"

const exampleHandler = (tips: ExamplePayload[]) => [
  rest.post<ExamplePayload, PathParams, ExampleResponse>(ROUTE, async (req, res, ctx) => {
    const { user, tip } = await req.json()

    const { firstName, lastName } = user

    if (!firstName || !lastName || !tip) return res(ctx.status(HttpStatus.BAD_REQUEST))

    tips = [{ user, tip }, ...tips]

    return res(ctx.status(HttpStatus.CREATED), ctx.json({ user, tip }))
  }),

  rest.get<DefaultBodyType, PathParams, ExampleResponse[]>(ROUTE, async (req, res, ctx) => {
    return res(ctx.status(HttpStatus.OK), ctx.json(tips))
  })
]

export default exampleHandler
