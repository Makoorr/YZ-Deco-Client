import { CheckoutFormValues } from "@lib/context/checkout-context"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import TunisianCitiesSelect from "../tunisian-countries-select"
import { useCart } from "medusa-react"

const BillingAddress = () => {
  const { cart } = useCart()
  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, formState: { errors, touchedFields } }) => (
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="Prénom"
              {...register("billing_address.first_name", {
                required: "Prénom est requis",
              })}
              autoComplete="given-name"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="Nom"
              {...register("billing_address.last_name", {
                required: "Nom est requis",
              })}
              autoComplete="family-name"
              errors={errors}
              touched={touchedFields}
            />
          </div>
          <div className="grid grid-cols-3 gap-x-3">
              <Input
                label="Téléphone"
                {...register("shipping_address.phone")}
                autoComplete="tel"
                errors={errors}
                touched={touchedFields}
                minLength={8}
                maxLength={8}
              />
              {(cart?.region.currency_code == "tnd") ? (
                  <TunisianCitiesSelect
                    registerCity={register("shipping_address.city", {
                      required: "Ville requise",
                    })}
                    registerProvince={register("shipping_address.province")}
                    autoComplete="address-level2"
                    errors={errors}
                    touched={touchedFields}
                  />
              ):(
                <>
                  <Input
                    label="Ville"
                    {...register("shipping_address.city", {
                      required: "Ville requise",
                    })}
                    autoComplete="address-level2"
                    errors={errors}
                    touched={touchedFields}
                  />
                  <Input
                    label="Adresse"
                    {...register("shipping_address.address_1", {
                      required: "Adresse requise",
                    })}
                    autoComplete="address-line1"
                    errors={errors}
                    touched={touchedFields}
                  />
                </>
                )}
            </div>
        </div>
      )}
    </ConnectForm>
  )
}

export default BillingAddress
