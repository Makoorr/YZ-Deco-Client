import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const FooterCTA = () => {
  return (
    <div className="bg-amber-800 w-full" style={{ height: "60vh" }}>
      <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-16 relative" style={{ height: "100%" }}>
        <div>
          <h3 className="text-2xl-semi">Achetez les derniers styles</h3>
          <div className="mt-6">
            <UnderlineLink href="/store">Explorer nos produits</UnderlineLink>
          </div>
        </div>

        <div className="relative w-full aspect-square small:w-[35%] small:aspect-[28/36]" style={{ height: "100%" }}>
          <Image
            src="/cadeaux.jpg"
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
