// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from "msw/node"

import endpoints from "./mswenv"

const server = setupServer(...endpoints)

export default server
