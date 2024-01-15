import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"
import ArrowRight from "../../../common/icons/arrow-right"

const FooterCTA = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 from-10% via-pink-500 via-40% to-orange-300 w-full text-white md:h-96">
      <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-8 relative" style={{ height: "100%" }}>
        <div>
          <h3 className="text-2xl-semi">Visitez nos réseaux sociaux</h3>
          <div className="mt-6 px-4 md:px-8 scale-110">
            <a href="https://www.instagram.com/y_z_deco"
              target="_blank"
              className="border-b pb-2"
              rel="noreferrer"
            >
              Explorer notre page Instagram
              <ArrowRight className="inline-block ml-2" />
            </a>
          </div>
        </div>

        <div className="relative w-full aspect-square small:w-[35%] small:aspect-[28/36]" style={{ height: "100%" }}>
          <Image
            src="/instagram.png"
            alt=""
            className="absolute inset-0"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FooterCTA
