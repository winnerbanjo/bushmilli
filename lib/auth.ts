import { cookies } from "next/headers";

const cookieName = "bushmilli_admin";

export async function isAdmin() {
  const store = await cookies();
  return store.get(cookieName)?.value === "active";
}

export async function setAdminCookie() {
  const store = await cookies();
  store.set(cookieName, "active", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(cookieName);
}

export function validateAdmin(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedEmail || !expectedPassword) {
    return false;
  }

  return email === expectedEmail && password === expectedPassword;
}
