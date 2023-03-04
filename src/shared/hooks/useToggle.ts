import { useCallback, useState } from "react"

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(() => setState((state) => !state), [])

  const reset = useCallback(() => setState(initialState), [initialState])

  return { state, toggle, reset }
}

export default useToggle
