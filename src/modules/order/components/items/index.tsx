import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import Link from "next/link"

type ItemsProps = {
  items: LineItem[]
  region: Region
  cartId: string
}

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId)

  return (
    <div className="p-10 border-b border-gray-200 gap-y-4 flex flex-col ">
      {enrichedItems?.length
        ? enrichedItems.map((item) => {
            return (
              <div className="grid md:grid-cols-[122px_1fr] gap-x-4" key={item.id}>
                <div className="w-[122px]">
                  <Thumbnail thumbnail={item.thumbnail} size="full" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex flex-col flex-1 text-small-regular">
                    <div className="flex flex-col md:flex-row items-start justify-between">
                      <div className="break-all overflow-hidden">
                        <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4">
                          <Link
                            href={`/products/${item.variant.product.handle}`}
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <LineItemOptions variant={item.variant} />
                        <span>Quantité: {item.quantity}</span>
                        <br></br>
                        <p className="h-20 text-ellipsis">Description: {item.metadata?.text_description}</p>
                      </div>
                      <div className="flex justify-end">
                        <LineItemPrice region={region} item={item} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        : Array.from(Array(items.length).keys()).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
    </div>
  )
}

export default Items
