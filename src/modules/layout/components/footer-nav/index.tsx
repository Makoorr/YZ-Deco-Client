"use client"

import clsx from "clsx"
import { useCollections } from "medusa-react"
import Link from "next/link"
import Image from "next/image"
import CountrySelect from "../country-select"

const FooterNav = () => {
  const { collections } = useCollections()

  return (
    <>
      <div className="bg-gray-300 md:px-48 px-4 py-8 flex gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <Image
              src="/secure_payment.png"
              alt=""
              className="rounded-lg"
              width={100}
              height={100}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          <span className="px-4 font-medium">
            Paiement 100% Sécurisé
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Image
              src="/guarantie.png"
              alt=""
              className="rounded-lg"
              width={100}
              height={100}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          <span className="px-4 font-medium">
            Guarantie de Livraison
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Image
              src="/rating.png"
              alt=""
              className="rounded-lg"
              width={100}
              height={100}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          <span className="px-4 font-medium">
            Retours Positives 100.000+
          </span>
        </div>
      </div>
      <div className="content-container flex flex-col gap-y-8 pt-16 pb-8">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between">
          <div>
            <Link href="/" className="text-xl-semi uppercase">
              Y&Z Deco
            </Link>
          </div>
          <div className="text-small-regular grid grid-cols-2 gap-x-16">
            <div className="flex flex-col gap-y-2">
              <span className="text-base-semi">Nos Collections</span>
              <ul
                className={clsx("grid grid-cols-1 gap-2", {
                  "grid-cols-2 gap-2": (collections?.length || 0) > 4,
                })}
              >
                {collections?.map((c) => (
                  <li key={c.id}>
                    <Link href={`/collections/${c.handle}`}>{c.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-base-semi">Réseaux Sociaux</span>
              <ul className="grid grid-cols-1 gap-y-2">
                <li>
                  <a
                    href="https://www.facebook.com/profile.php/?id=100069397394133"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/y_z_deco"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-y-4 justify-center xsmall:items-center xsmall:flex-row xsmall:items-end xsmall:justify-between">
          <span className="text-xsmall-regular text-gray-500">
            © Copyright 2023 Y&Z Deco <br></br> Powered By Medusa <br></br> Images By Freepik
          </span>
          <div className="min-w-[316px] flex xsmall:justify-end">
            <CountrySelect />
          </div>
        </div>
      </div>
    </>
  )
}

export default FooterNav
