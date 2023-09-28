import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import TextDescription from "@modules/home/components/text-description"
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
      <hr className="xsmall:mt-8 mt-4"
        style={{
          borderTop: "3px solid #00000020",
        }}
      ></hr>
      <FeaturedProducts />
      <hr className="xsmall:mb-8 mb-4"
        style={{
          borderTop: "3px solid #00000020",
        }}
      ></hr>
      <TextDescription />
      <hr className="xsmall:mb-8 mb-4"
        style={{
          borderTop: "3px solid #00000020",
        }}
      ></hr>
    </>
  )
}

export default Home
