import { Order, PaymentStatus } from "@medusajs/medusa"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const items = order.items.reduce((acc, i) => acc + i.quantity, 0)

  const formatStatus = (str: string) => {
    switch (str) {
      case "captured":
        return <span className="font-medium text-green-600">Payé ●</span>
      case "awaiting":
      case "canceled":
      case "partially_refunded":
      case "not_paid":
      case "refunded":
      case "requires_action":
      default:
        return <span className="font-medium text-red-600">Non Payé ●</span>
    }
  }
  
  const formatFullfilmentStatus = (str: string) => {      
    switch (str){
      case "not_fulfilled":
        return <span className="font-medium text-red-600">Non Livrée ●</span>;
      case "partially_fulfilled":
        return <span className="font-medium text-red-400">Livrée en partie ●</span>;
      case "fulfilled":
        return <span className="font-medium text-green-600">Livrée ●</span>
      case "partially_shipped":
        return <span className="font-medium text-red-400">Livrée en partie ●</span>;
      case "shipped":
        return <span className="font-medium text-red-400">Livrée en partie ●</span>;
      case "canceled":
        return <span className="font-medium text-red-600">Annulée ●</span>;
      case "partially_returned":
      case "returned":
      case "requires_action":
      default:
        return <span className="font-medium text-red-600">Non Livrée ●</span>;
    }
  }

  return (
    <div className="p-10 border-b border.gray-200 flex md:flex-row flex-col justify-between">
      <div className="truncate">
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
        <div className="flex flex-col gap-1 md:gap-2 md:px-5 md:items-center h-full">
          <div className="flex flex-row gap-1 md:gap-4 items-center h-full">
              <h1 className="text-gray-700 text-small-regular font-medium uppercase">Etat de la commande: </h1>
              <span>{formatStatus(order.payment_status)}</span>
          </div>
              {(order.payment_status.toString() !== "captured") && (
                <div className="flex flex-row gap-1 md:gap-4 items-center h-full">
                  <h1 className="text-gray-700 text-small-regular font-medium uppercase">Etat de la livraison: </h1>
                  <span>{formatFullfilmentStatus(order.fulfillment_status)}</span>
                </div>
              )}
        </div>
      )}
    </div>
  )
}

export default OrderDetails
