import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Acceuil",
  description:
    "Chez Y&Z Deco, trouvez des idées de cadeaux pour la maison, des cadeaux pour elle, des cadeaux pour lui et des cadeaux pour les enfants.",
}

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

export default Home
