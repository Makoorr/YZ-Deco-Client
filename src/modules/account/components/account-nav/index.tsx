import { useAccount } from "@lib/context/account-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Button from "../../../common/components/button"
import UnderlineLink from "../../../common/components/underline-link"

const AccountNav = () => {
  const route = usePathname()
  const { handleLogout } = useAccount()

  return (
    <div>
      <div className="small:hidden">
        {route !== "/account" && (
          <Link
            href="/account"
            className="flex items-center gap-x-2 text-small-regular w-max py-2 pl-4"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span className="text-lg">Retour</span>
            </>
          </Link>
        )}
      </div>
      <div className="hidden small:block">
        <div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink href="/account" route={route!}>
                Aperçu
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/profile" route={route!}>
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/addresses" route={route!}>
                Adresses de livraison
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route!}>
                Commandes
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <Button variant="secondary" onClick={handleLogout}>
                  Se déconnecter
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
}

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href
  return (
    <UnderlineLink
      href={href}
      arrow={false}
      className={clsx({
        "text-gray-900 font-semibold text-xl pl-4 pr-1": active,
      })}
    >
      <>{children}</>
    </UnderlineLink>
  )
}

export default AccountNav
