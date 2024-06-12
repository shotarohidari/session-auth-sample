"use client"

import { login } from "@/actions"
import { useFormState } from "react-dom"
import { FormSubmitButton } from "./FormSubmitButton"

export function Form() {
  const [state, formAction] = useFormState(login, null)
  return (
    <div>
      <form action={formAction} className="login-form">
        <div className="login-field">
          <label htmlFor="email">メールアドレス:</label>
          <input type="email" name="email" />
        </div>
        <div className="login-field">
          <label htmlFor="password">パスワード:</label>
          <input type="password" name="password" />
        </div>
        <FormSubmitButton />
      </form>
      <div className="error-message">{state?.error && state.error}</div>
    </div>
  )
}
