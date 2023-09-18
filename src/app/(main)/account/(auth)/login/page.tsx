import LoginTemplate from "@modules/account/templates/login-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Se connecter",
  description: "Se connecter à Y&Z Deco.",
}

export default function Login() {
  return <LoginTemplate />
}
