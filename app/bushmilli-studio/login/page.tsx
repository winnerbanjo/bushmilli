import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="admin-shell">
      <Link className="brand" href="/">
        BushMilli
      </Link>
      <section>
        <span className="eyebrow">Admin</span>
        <h1>Login</h1>
      </section>
      <LoginForm />
    </main>
  );
}
