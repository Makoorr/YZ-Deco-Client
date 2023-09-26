"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import { Carousel } from "@modules/common/components/carousel"
import UnderlineLink from "@modules/common/components/underline-link"

const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <div className="py-12">
      <div className="content-container py-12">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-base-regular text-gray-600 mb-6">
          Derniers produits
          </span>
          <p className="text-2xl-regular text-gray-900 max-w-lg mb-4">
          Nos nouveaux styles sont là pour vous aider à être à votre meilleur.
          </p>
          <UnderlineLink href="/store">Explorer nos produits</UnderlineLink>
        </div>
        <Carousel content={data} />
      </div>
    </div>
  )
}

export default FeaturedProducts
