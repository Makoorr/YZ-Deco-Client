import CollectionShowcase from "@modules/home/components/collection-showcase"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import TextDescription from "@modules/home/components/text-description"
import { Metadata } from "next"
import EventHero from "../../modules/home/components/event-hero"

export const metadata: Metadata = {
  title: "Acceuil",
  description:
    "Chez Y&Z Deco, trouvez des idées de cadeaux pour la maison, des cadeaux pour elle, des cadeaux pour lui et des cadeaux pour les enfants.",
}

const Home = () => {
  return (
    <div>
      <Hero />
      <EventHero />
      <FeaturedProducts />
      {/* <TextDescription /> */}
      <CollectionShowcase />
    </div>
  )
}

export default Home
