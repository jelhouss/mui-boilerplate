// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw"

import { authenticatedUsers } from "../factories/userFactory"
import authenticationHandler from "./handlers/authenticationHandler"
import registrationHandler from "./handlers/registrationHandler"

const methods: (keyof typeof rest)[] = ["head", "get", "post", "put", "delete", "patch", "options"]

const throttle = methods.map((method) =>
  // eslint-disable-next-line no-promise-executor-return
  rest[method]("/api/*", () => new Promise((resolve) => setTimeout(resolve, 2000)))
)

const endpoints = [
  ...throttle,
  ...authenticationHandler(authenticatedUsers),
  ...registrationHandler(authenticatedUsers)
]

export default endpoints
