import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { formatAmount } from "medusa-react"
import { ProductPreviewType } from "types/global"
import { CalculatedVariant } from "types/medusa"
import { formatTNDAmount } from "./tnd-price"

const transformProductPreview = (
  product: PricedProduct,
  region: Region
): ProductPreviewType => {
  const variants = product.variants as unknown as CalculatedVariant[]

  let cheapestVariant = undefined

  if (variants?.length > 0) {
    cheapestVariant = variants.reduce((acc, curr) => {
      if (acc.calculated_price > curr.calculated_price) {
        return curr
      }
      return acc
    }, variants[0])
  }

  return {
    id: product.id!,
    title: product.title!,
    handle: product.handle!,
    thumbnail: product.thumbnail!,
    price: cheapestVariant
      ? {
          calculated_price: (region?.currency_code !== "tnd" || !(cheapestVariant.calculated_price)) ?
            formatAmount({
              amount: cheapestVariant.calculated_price,
              region: region,
              includeTaxes: false,
            }) : formatTNDAmount(cheapestVariant.calculated_price),
          original_price: (region?.currency_code !== "tnd" || !(cheapestVariant.original_price)) ?
            formatAmount({
              amount: cheapestVariant.original_price,
              region: region,
              includeTaxes: false,
            }) : formatTNDAmount(cheapestVariant.original_price),
          difference: getPercentageDiff(
            cheapestVariant.original_price,
            cheapestVariant.calculated_price
          ),
          price_type: cheapestVariant.calculated_price_type,
        }
      : undefined,
  }
}

export default transformProductPreview
