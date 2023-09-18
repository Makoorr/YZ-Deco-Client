import ProfileTemplate from "@modules/account/templates/profile-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profil",
  description: "Voir et modifier mon profil.",
}

export default function Profile() {
  return <ProfileTemplate />
}
