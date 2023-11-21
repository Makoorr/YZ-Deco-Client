import { Order } from "@medusajs/medusa"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const items = order.items.reduce((acc, i) => acc + i.quantity, 0)

  const formatStatus = (str: string) => {
    if(str === "captured")
      return <span className="font-medium text-green-600">Payé ●</span>
    else
      return <span className="font-medium text-red-600">Non Payé ●</span>
  }

  return (
    <div className="p-10 border-b border.gray-200 flex flex-row justify-between">
      <div>
        <span className="text-gray-700 text-small-regular uppercase">
          Votre commande a bien été passée.
        </span>
        <h1 className="mt-2 uppercase text-2xl-semi">#{order.display_id}</h1>
        <span>{order.id.split("order_")[1]}</span>
        <div className="flex items-center text-gray-700 text-small-regular gap-x-4 mt-4">
          <span>{new Date(order.created_at).toDateString()}</span>
          <span>{`${items} ${items !== 1 ? "items" : "item"}`}</span>
        </div>
      </div>
      {showStatus && (
        <div className="flex flex-row gap-4 px-5 items-center h-full">
            <h1 className="text-gray-700 text-small-regular font-medium uppercase">Etat de la commande: </h1>
            <span>{formatStatus(order.payment_status)}</span>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
