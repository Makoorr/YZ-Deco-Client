import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import { Address } from "@medusajs/medusa"
import CountrySelect from "@modules/checkout/components/country-select"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Edit from "@modules/common/icons/edit"
import Spinner from "@modules/common/icons/spinner"
import Trash from "@modules/common/icons/trash"
import clsx from "clsx"
import { useCart } from "medusa-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import TunisianCitiesSelect from "../../../checkout/components/tunisian-countries-select"

type FormValues = {
  first_name: string
  last_name: string
  city: string
  country_code: string
  postal_code: string
  province?: string
  address_1: string
  address_2?: string
  phone?: string
  company?: string
}

type EditAddressProps = {
  address: Address
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  address,
  isActive = false,
}) => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const { cart } = useCart()
  const { refetchCustomer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      first_name: address.first_name || undefined,
      last_name: address.last_name || undefined,
      city: address.city || undefined,
      address_1: address.address_1 || undefined,
      address_2: address.address_2 || undefined,
      country_code: address.country_code || undefined,
      postal_code: address.postal_code || undefined,
      phone: address.phone || undefined,
      company: address.company || undefined,
      province: address.province || undefined,
    },
  })

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data?.company || "",
      address_1: data.address_1,
      address_2: data?.address_2 || "",
      city: data?.city || "",
      country_code: (cart?.region.currency_code === "tnd") ? "tn" : (data?.country_code || ""),
      province: data?.province || "",
      postal_code: data?.postal_code || "",
      phone: data?.phone || "",
      metadata: {},
    }

    medusaClient.customers.addresses
      .updateAddress(address.id, payload)
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        close()
      })
      .catch(() => {
        setSubmitting(false)
        setError("Erreur lors de la mise à jour de l'adresse.")
      })
  })

  const removeAddress = () => {
    medusaClient.customers.addresses.deleteAddress(address.id).then(() => {
      refetchCustomer()
    })
  }

  return (
    <>
      <div
        className={clsx(
          "border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors",
          {
            "border-gray-900": isActive,
          }
        )}
      >
        <div className="flex flex-col">
          <span className="text-left text-base-semi">
            {address.first_name} {address.last_name}
          </span>
          {address.company && (
            <span className="text-small-regular text-gray-700">
              {address.company}
            </span>
          )}
          <div className="flex flex-col text-left text-base-regular mt-2">
            <span>
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span>
              {address.postal_code && `${address.postal_code},`} {address.city && `${address.city}, `}
              {address.province && `${address.province}`}
            </span>
            <span>
              {address.country_code?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="text-small-regular text-gray-700 flex items-center gap-x-2"
            onClick={open}
          >
            <Edit size={16} />
            Modifier
          </button>
          <button
            className="text-small-regular text-gray-700 flex items-center gap-x-2"
            onClick={removeAddress}
          >
            <Trash />
            Supprimer
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close}>
        <Modal.Title>Modifier votre adresse</Modal.Title>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-y-2">
          <Input
              label="Prénom"
              {...register("first_name", {
                required: "Prénom requis",
              })}
              required
              errors={errors}
              autoComplete="given-name"
            />
            <Input
              label="Nom"
              {...register("last_name", {
                required: "Nom requis",
              })}
              required
              errors={errors}
              autoComplete="family-name"
            />
            <div className="grid grid-cols-2 gap-x-2">
              {(cart?.region?.currency_code == "tnd") ? (
              <>
                <TunisianCitiesSelect
                  registerCity={register("city", {
                    required: "Ville requise",
                  })}
                  registerProvince={register("province")}
                  autoComplete="address-level2"
                  errors={errors} />
              </>
              ):(
              <>
                <Input
                  label="Ville"
                  {...register("city", {
                    required: "Ville requise",
                  })}
                  autoComplete="address-level2"
                  errors={errors}
                />
                <Input
                  label="Région"
                  {...register("province", {
                    required: "Région requise",
                  })}
                  autoComplete="address-line1"
                  errors={errors}
                />
              </>
              )}
            </div>

            <Input
              label="Adresse"
              {...register("address_1", { required: true })}
              errors={errors} />
            <Input
              label="Téléphone"
              {...register("phone")}
              errors={errors}
              minLength={8}
              maxLength={8}
              type="number"
              autoComplete="phone"
            />
          </div>
          {error && (
            <div className="text-rose-500 text-small-regular py-2">{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Annuler
          </Button>
          <Button onClick={submit} disabled={submitting}>
            Enregistrer
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditAddress
