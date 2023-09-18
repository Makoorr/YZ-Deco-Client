import OrdersTemplate from "@modules/account/templates/orders-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Commandes",
  description: "Mes commandes..",
}

export default function Orders() {
  return <OrdersTemplate />
}
