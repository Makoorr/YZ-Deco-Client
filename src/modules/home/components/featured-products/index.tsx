"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import { Carousel } from "@modules/common/components/carousel"
import UnderlineLink from "@modules/common/components/underline-link"

const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <div className="my-12">
      <div className="bg-gradient-to-r from-purple-500/75 from-10% via-pink-500/75 via-40% to-orange-300/75 p-8"> {/*  my-6 border-1 rounded-md shadow-lg content-container py-6 */}
        <p className="font-medium text-4xl max-w-xl pb-8">
          Notre Nouveauté
        </p>
        <div>
          <Carousel voirplus={false} content={data} />
        </div>
        <div className="flex justify-center mt-2 font-bold">
          <UnderlineLink href="/store">Explorer nos produits</UnderlineLink>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
