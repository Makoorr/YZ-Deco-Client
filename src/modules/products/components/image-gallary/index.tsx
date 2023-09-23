import { Image as MedusaImage } from "@medusajs/medusa"
import Image from "next/image"
import { useRef, useState } from "react"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [actualImage, setActualImage] = useState(images[0].id);

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    const actualElement = document.getElementById(actualImage);
    if (element) {
      actualElement?.children[0].setAttribute("hidden", "");
      element.children[0].removeAttribute("hidden");
      setActualImage(element.id);
    }
  }

  return (
    <div className="flex items-start relative">
      <div className="hidden small:flex flex-col gap-y-4 sticky top-20">
        {images.map((image, index) => {
          return (
            <button
              key={image.id}
              className="h-14 w-12 relative border border-white"
              onClick={() => {
                handleClick(image.id)
              }}
            >
              <span className="sr-only">Voir image {index + 1}</span>
              <Image
                src={image.url}
                className="absolute inset-0"
                alt="Thumbnail"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </button>
          )
        })}
      </div>
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <div
              ref={(image) => imageRefs.current.push(image)}
              key={image.id}
              className="absolute aspect-[1/1]"
              id={image.id}
              style={{ overflow: "hidden", width: "-webkit-fill-available", marginRight: "5em", marginBottom: "5em" }}
            >
              { (index<1) ? (
              <Image
              src={image.url}
              priority={index <= 2 ? true : false}
              className="inset-0"
              alt={`Product image ${index + 1}`}
              fill
              sizes="100%"
              style={{
                objectFit: "cover",
              }}
              />
              ) : (
                <Image
              src={image.url}
              priority={index <= 2 ? true : false}
              className="inset-0"
              alt={`Product image ${index + 1}`}
              fill
              hidden
              sizes="100%"
              style={{
                objectFit: "cover",
              }}
              />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
