import { Order } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount } from "medusa-react"
import Link from "next/link"
import { useMemo, useRef } from "react"
import { formatTNDAmount } from "../../../../lib/util/tnd-price"

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items.length
  }, [order])

  
  const linkRef = useRef<HTMLInputElement>(null);

  const genererPaiement = async () => {
    if (linkRef?.current) {
      try {
        linkRef.current.innerHTML = "Chargement...";

        const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/konnect-payurl?cartId=${order.cart_id}`, {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
        if (!response.ok)
          throw new Error(response.statusText)
        const data = await response.json()
        linkRef.current.innerHTML = `<a href=${data.payUrl} style='color: blue;' target='_blank' rel='noopener noreferrer'>Lien du paiement</a>`;
      } catch (error) {
        linkRef.current.innerHTML = `<a style='color: red;'>Erreur</a>`;
      }
    }
  }

  return (
    <div className="bg-white flex flex-col">
      <div className="uppercase text-large-semi mb-1">#{order.display_id}</div>
      <div className="flex items-center divide-x divide-gray-200 text-small-regular text-gray-700">
        <span className="pr-2">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2">
          {(order.region.currency_code !== "tnd") ? formatAmount({
            amount: order.total,
            region: order.region,
            includeTaxes: false,
          }) : formatTNDAmount(order.total)}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "items" : "item"
        }`}</span>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-4 gap-4 my-4">
        {order.items.slice(0, 3).map((i) => {
          return (
            <div key={i.id} className="flex flex-col gap-y-2">
              <Thumbnail
                thumbnail={order.items[0].thumbnail}
                images={[]}
                size="full"
              />
              <div className="flex items-center text-small-regular text-gray-700">
                <span className="text-gray-900 font-semibold">{i.title}</span>
                <span className="ml-2">x</span>
                <span>{i.quantity}</span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-small-regular text-gray-700">
              + {numberOfLines - 4}
            </span>
            <span className="text-small-regular text-gray-700">plus</span>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 items-center">
        {(order.payment_status !== "captured") ? (
          <div className="flex items-center space-x-2">
              <Button onClick={genererPaiement} variant="secondary" className="min-w-[130px]">
              Génerer lien du paiement
              </Button>
          </div>
        ) : <span className="text-green-600 font-medium">Commande payé!</span>}
        <div ref={linkRef} className="flex flex-row items-center gap-5"></div> {/* Lien du paiement */}
        <Link href={`/order/details/${order.id}`} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">Voir détails</Button>
        </Link>
      </div>
    </div>
  )
}

export default OrderCard
