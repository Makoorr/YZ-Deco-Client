import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Panier",
  description: "Voir mon panier",
}

export default function Cart() {
  return <CartTemplate />
}
