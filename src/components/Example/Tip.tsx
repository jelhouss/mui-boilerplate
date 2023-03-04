import { zodResolver } from "@hookform/resolvers/zod"
import { SyntheticEvent, useCallback } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as Z from "zod"

import useGetTipsExample, { useTipExample } from "../../services/queries/exampleQuery"
import ExampleResponse from "../../types/example/ExampleResponse"
import ExampleUser from "../../types/example/ExampleUser"

interface TipListProps {
  tips: ExampleResponse[]
}

const TipList = ({ tips }: TipListProps) => {
  return (
    <ul>
      {tips.map(({ user: { id, firstName }, tip }) => {
        return (
          <li key={id}>
            {firstName} has submitted {tip} dollars
          </li>
        )
      })}
    </ul>
  )
}

const schema = Z.object({
  tip: Z.number({
    required_error: "Tip is required",
    invalid_type_error: "Tip must be a number"
  })
    .min(5, "Tip must be higher than 5")
    .max(10, "Tip must be lower than 10")
})

type FormInput = Z.infer<typeof schema>

export interface TipProps {
  currentUser: ExampleUser
}

const Tip = ({ currentUser }: TipProps) => {
  const { firstName } = currentUser

  const { data: tips, isLoading: getTipsLoading, isError: getTipsError } = useGetTipsExample()
  const {
    mutate: addTip,
    isLoading: addTipLoading,
    isError: addTipError,
    isSuccess: addTipSuccess
  } = useTipExample()

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields }
  } = useForm<FormInput>({
    resolver: zodResolver(schema)
  })

  const submit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()

      const onSubmit: SubmitHandler<FormInput> = ({ tip }) => addTip({ user: currentUser, tip })

      handleSubmit(onSubmit)(e)
    },
    [addTip, currentUser, handleSubmit]
  )

  return (
    <section>
      <h2>Hey {firstName}</h2>
      <h3>Tip Me</h3>
      <main>
        <p>Below you can find tips:</p>
        {getTipsLoading ? (
          <p>loading...</p>
        ) : getTipsError ? (
          <p>error has occured while getting tips</p>
        ) : tips ? (
          <TipList tips={tips} />
        ) : null}
        <form onSubmit={submit}>
          <label htmlFor="tip">Tip</label>
          <input
            type="number"
            id="tip"
            aria-describedby="tip-error"
            {...register("tip", { valueAsNumber: true })}
          />

          {touchedFields.tip && errors.tip ? (
            <p id="tip-error" role="alert">
              {errors.tip.message}
            </p>
          ) : null}

          <button type="submit">Add Tip</button>
        </form>

        {addTipLoading ? (
          <p>adding a tip...</p>
        ) : addTipError ? (
          <p>error has occured while adding a tip</p>
        ) : addTipSuccess ? (
          <p>tip added!</p>
        ) : null}
      </main>
    </section>
  )
}

export default Tip
