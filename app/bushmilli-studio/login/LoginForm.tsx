"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, { error: "" });

  return (
    <form className="admin-panel admin-grid" action={formAction}>
      {state.error ? <div className="error full">{state.error}</div> : null}
      <label className="field full">
        <span>Email</span>
        <input type="email" name="email" placeholder="admin@email.com" required />
      </label>
      <label className="field full">
        <span>Password</span>
        <input type="password" name="password" placeholder="Password" required />
      </label>
      <button className="button full" disabled={pending} type="submit">
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
