import OverviewTemplate from "@modules/account/templates/overview-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compte",
  description: "Activité de mon compte.",
}

export default function Account() {
  return <OverviewTemplate />
}
