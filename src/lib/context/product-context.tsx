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

const dotenv = require('dotenv');
dotenv.config();

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
  addToCart: (event?: React.MouseEvent<HTMLButtonElement>) => void
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

  const addToCart = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    let metadataObject = {};
    const targetEvent = (event?.currentTarget) ? event.currentTarget : null;
    // if (targetEvent) {
    //   targetEvent.disabled = true;
    //   targetEvent.innerHTML = `
    //   <svg aria-hidden="true" class="w-8 h-8 text-black animate-spin fill-red-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    //     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    //   </svg>`;
    // }
    
    if (variant) {
      if(textDescriptionRef.current != (undefined || null) ){
        metadataObject = {
          ...metadataObject,
          text_description: textDescriptionRef.current.value
        }
      }
      
      if(imageDescriptionRef.current != (undefined || null) ){
        try {
          const formData = new FormData();
          (imageDescriptionRef.current.files) ? formData.append('image', imageDescriptionRef.current.files[0]) : null;
          
          const response = await fetch(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL + '/upload' as string, {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            const result = await response.json();
            metadataObject = {
              ...metadataObject,
              image_url: result.file.location
            }
          }
        } catch (error) {}
      }
      // if(targetEvent) {
      //   targetEvent.disabled = false;
      //   targetEvent.innerText = !inStock ? "Rupture de stock" : "Ajouter au panier";
      // }
      
      addItem({
        variantId: variant.id,
        quantity,
        metadata: { ...metadataObject },
      })
    } else {
      (errorRef.current) ? errorRef.current.innerText = "Veuillez choisir les options" : null;
      
      setTimeout(() => {
        (errorRef.current) ? errorRef.current.innerText = "" : null;
      }, 2000);

      // if(targetEvent) {
      //   targetEvent.disabled = false;
      //   targetEvent.innerHTML = !inStock ? "Rupture de stock" : "Ajouter au panier";
      // }
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
