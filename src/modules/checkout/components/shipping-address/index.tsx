import { CheckoutFormValues } from "@lib/context/checkout-context"
import { emailRegex } from "@lib/util/regex"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import { useCart, useMeCustomer } from "medusa-react"
import AddressSelect from "../address-select"
import TunisianCitiesSelect from "../tunisian-countries-select"

const ShippingAddress = () => {
  const { customer } = useMeCustomer()
  const { cart } = useCart()
  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="mb-6 flex flex-col gap-y-4 bg-amber-100 p-4">
          <p className="text-small-regular">
            {`Bonjour ${customer.first_name}, Voulez-vous utiliser l'une des adresses sauvegardées?`}
          </p>
          <AddressSelect addresses={customer.shipping_addresses} />
        </div>
      )}
      <ConnectForm<CheckoutFormValues>>
        {({ register, formState: { errors, touchedFields } }) => (
          <div className="grid grid-cols-1 gap-y-2">
            <Input
              label="Email"
              {...register("email", {
                required: "Email requis",
                pattern: emailRegex,
              })}
              autoComplete="email"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label="Prénom"
                {...register("shipping_address.first_name", {
                  required: "Prénom requis",
                })}
                autoComplete="given-name"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="Nom"
                {...register("shipping_address.last_name", {
                  required: "Nom requis",
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
    </div>
  )
}

export default ShippingAddress
