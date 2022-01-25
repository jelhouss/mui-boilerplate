// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw"

import authentication from "../authentication"
import { authenticatedUsers } from "../faker/user"
import registration from "../registration"

const methods: (keyof typeof rest)[] = ["head", "get", "post", "put", "delete", "patch", "options"]

const throttle = methods.map((method) =>
  // eslint-disable-next-line no-promise-executor-return
  rest[method]("/api/*", () => new Promise((resolve) => setTimeout(resolve, 2000)))
)

const endpoints = [
  ...throttle,
  ...authentication(authenticatedUsers),
  ...registration(authenticatedUsers)
]

export default endpoints
