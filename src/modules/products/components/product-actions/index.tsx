import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useMemo } from "react"

type ProductActionsProps = {
  product: PricedProduct & { has_text: boolean, has_image: boolean }
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, textDescriptionRef, imageDescriptionRef, errorRef, options, inStock, variant } =
    useProductActions()

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

      {(product.variants.length) ? (
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
      ) : null}

      {(product.has_text || product.has_image) ? (
        <>
          <span className="text-base font-medium mb-1">Description pour personalisation</span>
          <div className="flex flex-col gap-y-1">
            {(product.has_text) && (
              <>
                <span className="text-base-semi">Description par texte</span>
                <textarea ref={textDescriptionRef} className="border rounded-md bg-gray-100 resize-none outline-none px-3 h-20" />
              </>
            )}
            {(product.has_image) && (
              <>
                <span className="text-base-semi">Description par image</span>
                <div className="border rounded-md p-3 bg-gray-100 overflow-hidden">
                  <input ref={imageDescriptionRef} type="file" name={"imageDescription"} />
                </div>
              </>
            )}
          </div>
        </> 
      ) : null}

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
