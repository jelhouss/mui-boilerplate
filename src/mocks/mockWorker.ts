import { setupWorker } from "msw"

import handlers from "./handlers"

const mockWorker = setupWorker(...handlers)

export default mockWorker
