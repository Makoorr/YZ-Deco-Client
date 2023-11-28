import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { LineItem, Region } from "@medusajs/medusa"
import clsx from "clsx"
import { formatAmount } from "medusa-react"
import { CalculatedVariant } from "types/medusa"
import { formatTNDAmount } from "../../../../lib/util/tnd-price"

type LineItemPriceProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  style?: "default" | "tight"
}

const LineItemPrice = ({
  item,
  region,
  style = "default",
}: LineItemPriceProps) => {
  const originalPrice =
    (item.variant as CalculatedVariant).original_price * item.quantity
  const hasReducedPrice = (item.total || 0) < originalPrice

  return (
    <div className="flex flex-col text-gray-700 text-right">
      <span
        className={clsx("text-base-regular whitespace-nowrap font-medium", {
          "text-rose-600": hasReducedPrice,
        })}
      >
        { (region.currency_code !== "tnd" || !(item.subtotal)) ? (
          formatAmount({
            amount: item.subtotal || 0,
            region: region,
            includeTaxes: false,
          })
        ) : formatTNDAmount(item.subtotal)}
      </span>
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-gray-500">Original: </span>
            )}
            <span className="line-through">
              { (region.currency_code !== "tnd" || !(originalPrice)) ? (
                formatAmount({
                  amount: originalPrice,
                  region: region,
                  includeTaxes: false,
                })
              ) : formatTNDAmount(originalPrice)}
            </span>
          </p>
          {style === "default" && (
            <span className="text-rose-600">
              -{getPercentageDiff(originalPrice, item.total || 0)}%
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default LineItemPrice
