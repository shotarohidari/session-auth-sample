import { useFormStatus } from "react-dom"

export function FormSubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="login-submit-btn" disabled={pending}>
      ログイン
    </button>
  )
}
