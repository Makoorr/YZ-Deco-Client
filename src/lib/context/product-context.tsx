"use client"

import { canBuy } from "@lib/util/can-buy"
import { findCheapestPrice } from "@lib/util/prices"
import isEqual from "lodash/isEqual"
import { formatVariantPrice, useCart } from "medusa-react"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Variant } from "types/medusa"
import { useStore } from "./store-context"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { update } from "lodash"
import medusaRequest from "../medusa-fetch"

interface ProductContext {
  formattedPrice: string
  quantity: number
  disabled: boolean
  inStock: boolean
  variant?: Variant
  maxQuantityMet: boolean
  options: Record<string, string>
  textDescriptionRef: React.MutableRefObject<any>
  imageDescriptionRef: React.MutableRefObject<any>
  errorRef: React.MutableRefObject<any>
  updateOptions: (options: Record<string, string>) => void
  increaseQuantity: () => void
  decreaseQuantity: () => void
  addToCart: () => void
}

const ProductActionContext = createContext<ProductContext | null>(null)

interface ProductProviderProps {
  children?: React.ReactNode
  product: PricedProduct
}

export const ProductProvider = ({
  product,
  children,
}: ProductProviderProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [options, setOptions] = useState<Record<string, string>>({})
  const textDescriptionRef = useRef<HTMLTextAreaElement>();
  const imageDescriptionRef = useRef<HTMLInputElement>();
  const errorRef = useRef<HTMLTextAreaElement>();
  const [maxQuantityMet, setMaxQuantityMet] = useState<boolean>(false)
  const [inStock, setInStock] = useState<boolean>(true)

  const { addItem } = useStore()
  const { cart } = useCart()
  const variants = product.variants as unknown as Variant[]

  useEffect(() => {
    // initialize the option state
    const optionObj: Record<string, string> = {}
    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }
    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      const tmp: Record<string, string> = {}

      for (const option of variant.options) {
        tmp[option.option_id] = option.value
      }

      map[variant.id] = tmp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  const disabled = useMemo(() => {
    return !variant
  }, [variant])

  // memoized function to get the price of the current variant
  const formattedPrice = useMemo(() => {
    if (variant && cart?.region) {
      return formatVariantPrice({ variant, region: cart.region })
    } else if (cart?.region) {
      return findCheapestPrice(variants, cart.region)
    } else {
      // if no variant is selected, or we couldn't find a price for the region/currency
      return "N/A"
    }
  }, [variant, variants, cart])

  useEffect(() => {
    if (variant) {
      setInStock(canBuy(variant))
    }
  }, [variant])

  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  async function fetchImageUrl(formData: FormData) {
    
  }

  const addToCart = async () => {
    let metadataObject = {};
    if (variant) {
      if(textDescriptionRef.current != (undefined || null) ){
        metadataObject = {
          text_description: textDescriptionRef.current.value
        }
        console.log(metadataObject);
      }
      
      if(imageDescriptionRef.current != (undefined || null) ){
        try {
          const formData = new FormData();
          (imageDescriptionRef.current.files) ? formData.append('file', imageDescriptionRef.current.files[0]) : null;
          
          const response = await fetch('your-backend-api-endpoint', {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log('File uploaded successfully:', result.imageUrl);
          } else {
            console.error('File upload failed:', response.statusText);
          }

        } catch (error) {
          console.error('An error occurred during file upload:', error);
        }
      }
      

      // addItem({
      //   variantId: variant.id,
      //   quantity,
      //   metadata: { ...metadataObject },
      // })
    } else {
      // Show error for 5seconds only
      (errorRef.current) ? errorRef.current.innerText = "Veuillez choisir les options" : null;
      setTimeout(() => {
        (errorRef.current) ? errorRef.current.innerText = "" : null;
      }, 5000);
    }
  }

  const increaseQuantity = () => {
    const maxQuantity = variant?.inventory_quantity || 0

    if (maxQuantity > quantity + 1) {
      setQuantity(quantity + 1)
    } else {
      setMaxQuantityMet(true)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)

      if (maxQuantityMet) {
        setMaxQuantityMet(false)
      }
    }
  }

  return (
    <ProductActionContext.Provider
      value={{
        quantity,
        maxQuantityMet,
        disabled,
        inStock,
        textDescriptionRef,
        imageDescriptionRef,
        errorRef,
        options,
        variant,
        addToCart,
        updateOptions,
        decreaseQuantity,
        increaseQuantity,
        formattedPrice,
      }}
    >
      {children}
    </ProductActionContext.Provider>
  )
}

export const useProductActions = () => {
  const context = useContext(ProductActionContext)
  if (context === null) {
    throw new Error(
      "useProductActionContext must be used within a ProductActionProvider"
    )
  }
  return context
}
