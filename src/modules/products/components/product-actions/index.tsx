import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useEffect, useMemo, useState } from "react"
import { CustomOptions } from "../custom-options"
import medusaRequest from "../../../../lib/medusa-fetch"

type ProductActionsProps = {
  product: PricedProduct
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, textDescriptionRef, imageDescriptionRef, errorRef, options, inStock, variant } =
    useProductActions()
  
  const [customText, setCustomText] = useState<boolean>(false)
  const [customImage, setCustomImage] = useState<boolean>(false)

  const fetchCustomProduct = async () => {
    const res = await medusaRequest("GET", `/customizedproduct/${product.id}`)
    if (res.ok) {
      setCustomText(res.body[0].has_text)
      setCustomImage(res.body[0].has_image)
    }
  }

  useEffect(() => {
    fetchCustomProduct()
  }, [])

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })
  
  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <div className="flex flex-col gap-y-2">
      {product.collection && (
        <Link
          href={`/collections/${product.collection.handle}`}
          className="text-small-regular text-gray-700"
        >
          {product.collection.title}
        </Link>
      )}
      <h3 className="text-xl-regular">{product.title}</h3>

      <p className="text-base-regular">{product.description}</p>

      {(product.variants) ? (
        <div className="my-8 flex flex-col gap-y-6">
          {(product.options || []).map((option) => {
            return (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  title={option.title}
                />
              </div>
            )
          })}
        </div>
      ) : <></>}
      
      {(customText || customImage) && (
        <CustomOptions
          textDescriptionRef={textDescriptionRef}
          imageDescriptionRef={imageDescriptionRef}
          customProduct={{
            has_text: customText,
            has_image: customImage
          }}
        />
      )}

      <div className="mb-4">
        {selectedPrice ? (
          <div className="flex flex-col text-gray-700">
            <span
              className={clsx("text-xl-semi", {
                "text-rose-600": selectedPrice.price_type === "sale",
              })}
            >
              {selectedPrice.calculated_price}
            </span>
            {selectedPrice.price_type === "sale" && (
              <>
                <p>
                  <span className="text-gray-500">Origine: </span>
                  <span className="line-through">
                    {selectedPrice.original_price}
                  </span>
                </p>
                <span className="text-rose-600">
                  -{selectedPrice.percentage_diff}%
                </span>
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>


      <Button onClick={(event) => addToCart(event)}>
        {!inStock ? "Rupture de stock" : "Ajouter au panier"}

      </Button>
      <div ref={errorRef} className="text-red-400 font-medium"></div>
    </div>
  )
}

export default ProductActions
