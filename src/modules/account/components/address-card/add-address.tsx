import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Plus from "@modules/common/icons/plus"
import Spinner from "@modules/common/icons/spinner"
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

const AddAddress: React.FC = () => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  
  const { cart } = useCart()
  const { refetchCustomer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const handleClose = () => {
    reset({
      first_name: "",
      last_name: "",
      city: "",
      country_code: "",
      postal_code: "",
      address_1: "",
      address_2: "",
      company: "",
      phone: "",
      province: "",
    })
    close()
  }

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
      .addAddress({ address: payload })
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        handleClose()
      })
      .catch(() => {
        setSubmitting(false)
        setError("Erreur lors de l'ajout de l'adresse.")
      })
  })

  return (
    <>
      <button
        className="border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
        onClick={open}
      >
        <span className="text-base-semi">Nouvelle adresse</span>
        <Plus size={24} />
      </button>

      <Modal isOpen={state} close={handleClose}>
        <Modal.Title>Ajouter votre adresse</Modal.Title>
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
          <Button
            className="!bg-gray-200 !text-gray-900 !border-gray-200 min-h-0"
            onClick={handleClose}
          >
            Annuler
          </Button>
          <Button className="min-h-0" onClick={submit} disabled={submitting}>
            Enregistrer
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddAddress
