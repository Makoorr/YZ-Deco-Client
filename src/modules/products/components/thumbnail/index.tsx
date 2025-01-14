import { Image as MedusaImage } from "@medusajs/medusa"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import clsx from "clsx"
import Image from "next/image"
import React from "react"
import styles from "./style.module.css"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: MedusaImage[] | null
  size?: "small" | "medium" | "large" | "full"
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <div
      className={styles.skel +" "+ clsx("relative aspect-[29/34] shadow-lg", {
        "w-[180px] rounded-md": size === "small",
        "w-[290px] rounded-xl": size === "medium",
        "w-[440px] rounded-2xl": size === "large",
        "w-full rounded-3xl": size === "full",
      })}
    >
        <ImageOrPlaceholder image={initialImage} size={size} />*
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      className="absolute inset-0"
      draggable={false}
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
        objectPosition: "center",
        overflow: "hidden",
      }}
    />
  ) : (
    <div className="w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
