"use client"

import { useAccount } from "@lib/context/account-context"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"
import ProfileBillingAddress from "../components/profile-billing-address"
import ProfilePhone from "../components/profile-phone"

const ProfileTemplate = () => {
  const { customer, retrievingCustomer, refetchCustomer } = useAccount()

  if (retrievingCustomer || !customer) {
    return null
  }

  return (
    <div className="p-5 lg:p-0 w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Mon profil</h1>
        <p className="text-base-regular">
        Affichez et mettez à jour les informations de votre profil, y compris votre nom, votre adresse e-mail et votre numéro de téléphone. Vous pouvez également mettre à jour votre adresse de facturation ou modifier votre mot de passe.
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        <ProfilePassword customer={customer} />
        <Divider />
        <ProfileBillingAddress customer={customer} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}

export default ProfileTemplate
