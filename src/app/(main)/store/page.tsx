import { Metadata } from "next"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Magasin",
  description: "Découvrir nos produits",
}

export default function StorePage() {
  return <StoreTemplate />
}
