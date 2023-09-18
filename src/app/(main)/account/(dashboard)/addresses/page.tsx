import AddressesTemplate from "@modules/account/templates/addresses-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Adresses",
  description: "Voir mes adresses",
}

export default function Addresses() {
  return <AddressesTemplate />
}
