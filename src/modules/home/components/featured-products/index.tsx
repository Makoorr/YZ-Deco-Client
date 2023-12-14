"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import { Carousel } from "@modules/common/components/carousel"
import UnderlineLink from "@modules/common/components/underline-link"

const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <div>
      <div className="bg-gradient-to-r from-purple-500 from-10% via-pink-500 via-40% to-orange-300 my-6 border-1 rounded-md shadow-lg content-container py-6">
        <div className="flex flex-col items-center text-center mb-4">
          <p className="text-xl-semi text-white max-w-xl mb-4">
          Nos nouveaux styles sont là pour vous aider à être à votre meilleur.
          </p>
        </div>
        <div className="text-white">
          <Carousel content={data} />
        </div>
        <div className="flex justify-center mt-2 text-white font-bold">
          <UnderlineLink href="/store">Explorer nos produits</UnderlineLink>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
