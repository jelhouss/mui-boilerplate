// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from "msw"

import endpoints from "./mswenv"

const worker = setupWorker(...endpoints)

export default worker
