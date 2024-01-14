import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import Button from "../../../common/components/button"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  voirplus,
}: ProductPreviewType) => {
  return (
    <Link href={`/products/${handle}`}>
      <div>
        <Thumbnail thumbnail={thumbnail} size="full" />
        <div className="flex justify-between mt-2 px-4">
          <div className="text-base-regular">
            <span>{title}</span>
            <div className="flex items-center gap-x-2 mt-1">
              {price ? (
                <>
                  {price.price_type === "sale" && (
                    <span className="line-through text-gray-500">
                      {price.original_price}
                    </span>
                  )}
                  <span
                    className={clsx("font-semibold", {
                      "text-rose-500": price.price_type === "sale",
                    })}
                  >
                    {price.calculated_price}
                  </span>
                </>
              ) : (
                <div className="w-20 h-6 animate-pulse bg-gray-100 shadow-lg"></div>
              )}
            </div>
          </div>
          <div className={voirplus != false ? "" : "hidden"}>
              <Button variant="secondary" className="border-1 rounded-md border-black">Voir Plus</Button>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductPreview
