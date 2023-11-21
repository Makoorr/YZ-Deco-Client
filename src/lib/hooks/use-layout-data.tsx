import { getProductsList, getCollectionsList } from "@lib/data"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { Product, ProductCollection, Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { useQuery } from "@tanstack/react-query"
import { formatAmount, useCart } from "medusa-react"
import { ProductPreviewType } from "types/global"
import { CalculatedVariant } from "types/medusa"
import { formatTNDAmount } from "../util/tnd-price"

type LayoutCollection = {
  handle: string
  title: string
  imageURL: string
}

type Collection = {
  title: string;
  handle: string;
  products: Product[];
  metadata: Record<string, unknown>;
  imageURL: string;
}

const fetchCollection = async (): Promise<LayoutCollection[]> => {
  let collections: Collection[] = []
  let offset = 0
  let count = 1

  do {
    await getCollectionsList(offset)
      .then((res) => res)
      .then(({ collections: newCollections, count: newCount }) => {
        collections = [...collections, ...newCollections]
        count = newCount
        offset = collections.length
      })
      .catch((_) => {
        count = 0
      })
  } while (collections.length < count)

  return collections.map((c) => ({
    handle: c.handle,
    title: c.title,
    imageURL: c.imageURL,
  }))
}

export const useShowcaseCollections = () => {
  const queryResults = useQuery({
    queryFn: fetchCollection,
    queryKey: ["showcase_collections"],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return queryResults
}

const fetchCollectionData = async (): Promise<LayoutCollection[]> => {
  let collections: ProductCollection[] = []
  let offset = 0
  let count = 1

  do {
    await getCollectionsList(offset)
      .then((res) => res)
      .then(({ collections: newCollections, count: newCount }) => {
        collections = [...collections, ...newCollections]
        count = newCount
        offset = collections.length
      })
      .catch((_) => {
        count = 0
      })
  } while (collections.length < count)

  return collections.map((c) => ({
    handle: c.handle,
    title: c.title,
    imageURL: "",
  }))
}

export const useNavigationCollections = () => {
  const queryResults = useQuery({
    queryFn: fetchCollectionData,
    queryKey: ["navigation_collections"],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return queryResults
}

const fetchFeaturedProducts = async (
  cartId: string,
  region: Region
): Promise<ProductPreviewType[]> => {
  const products: PricedProduct[] = await getProductsList({
    // pageParam: 1,
    queryParams: {
      // limit: 3,
      cart_id: cartId,
      region_id: region.id,
    },
  })
    .then((res) => res.response)
    .then(({ products }) => products)
    .catch((_) => [] as PricedProduct[])

  return products
    .filter((p) => !!p.variants)
    .map((p) => {
      const variants = p.variants as unknown as CalculatedVariant[]

      const cheapestVariant = variants.reduce((acc, curr) => {
        if (acc.calculated_price > curr.calculated_price) {
          return curr
        }
        return acc
      }, variants[0])

      return {
        id: p.id!,
        title: p.title!,
        handle: p.handle!,
        thumbnail: p.thumbnail!,
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
          : {
              calculated_price: "N/A",
              original_price: "N/A",
              difference: "N/A",
              price_type: "default",
            },
      }
    })
}

export const useFeaturedProductsQuery = () => {
  const { cart } = useCart()

  const queryResults = useQuery(
    ["layout_featured_products", cart?.id, cart?.region],
    () => fetchFeaturedProducts(cart?.id!, cart?.region!),
    {
      enabled: !!cart?.id && !!cart?.region,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  return queryResults
}
