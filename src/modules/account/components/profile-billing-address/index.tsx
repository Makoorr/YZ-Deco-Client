import { useAccount } from "@lib/context/account-context"
import { Customer, StorePostCustomersCustomerReq } from "@medusajs/medusa"
import Input from "@modules/common/components/input"
import NativeSelect from "@modules/common/components/native-select"
import { useCart, useRegions, useUpdateMe } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"
import AccountInfo from "../account-info"
import TunisianCitiesSelect from "../../../checkout/components/tunisian-countries-select"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

type UpdateCustomerNameFormData = Pick<
  StorePostCustomersCustomerReq,
  "billing_address"
>

const ProfileBillingAddress: React.FC<MyInformationProps> = ({ customer }) => {
  const { cart } = useCart()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateCustomerNameFormData>({
    defaultValues: {
      ...mapBillingAddressToFormData({ customer }),
    },
  })

  const {
    mutate: update,
    isLoading,
    isSuccess,
    isError,
    reset: clearState,
  } = useUpdateMe()

  const { regions } = useRegions()

  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }))
        })
        .flat() || []
    )
  }, [regions])

  useEffect(() => {
    reset({
      ...mapBillingAddressToFormData({ customer }),
    })
  }, [customer, reset])

  const { refetchCustomer } = useAccount()

  const [
    firstName,
    lastName,
    company,
    address1,
    address2,
    city,
    province,
    postalCode,
    countryCode,
  ] = useWatch({
    control,
    name: [
      "billing_address.first_name",
      "billing_address.last_name",
      "billing_address.company",
      "billing_address.address_1",
      "billing_address.address_2",
      "billing_address.city",
      "billing_address.province",
      "billing_address.postal_code",
      "billing_address.country_code",
    ],
  })

  const updateBillingAddress = (data: UpdateCustomerNameFormData) => {
    return update(
      {
        id: customer.id,
        ...data,
      },
      {
        onSuccess: () => {
          refetchCustomer()
        },
      }
    )
  }

  const currentInfo = useMemo(() => {
    if (!customer.billing_address) {
      return "Aucune adresse de facturation"
    }

    const country =
      regionOptions?.find(
        (country) => country.value === customer.billing_address.country_code
      )?.label || customer.billing_address.country_code?.toUpperCase()

    return (
      <div className="flex flex-col font-semibold">
        <span>
          {customer.billing_address.first_name}{" "}
          {customer.billing_address.last_name}
        </span>
        <span>{customer.billing_address.company}</span>
        <span>
          {customer.billing_address.address_1}
          {customer.billing_address.address_2
            ? `, ${customer.billing_address.address_2}`
            : ""}
          {customer.billing_address.postal_code},{" "}
          {customer.billing_address.city}
        </span>
        <span>{country}</span>
      </div>
    )
  }, [customer, regionOptions])

  return (
    <form
      onSubmit={handleSubmit(updateBillingAddress)}
      onReset={() => reset(mapBillingAddressToFormData({ customer }))}
      className="w-full"
    >
      <AccountInfo
        label="Adresse de facturation"
        currentInfo={currentInfo}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        clearState={clearState}
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Prénom"
            {...register("billing_address.first_name", {
              required: true,
            })}
            defaultValue={firstName}
            errors={errors}
          />
          <Input
            label="Nom"
            {...register("billing_address.last_name", { required: true })}
            defaultValue={lastName}
            errors={errors}
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            {(cart?.region?.currency_code == "tnd") ? (
            <>
              <TunisianCitiesSelect
                registerCity={register("billing_address.city", {
                  required: "Ville requise",
                })}
                registerProvince={register("billing_address.province")}
                autoComplete="address-level2"
                errors={errors} />
            </>
            ):(
            <>
              <Input
                label="Ville"
                {...register("billing_address.city", {
                  required: "Ville requise",
                })}
                autoComplete="address-level2"
                errors={errors}
              />
              <Input
                label="Région"
                {...register("billing_address.province", {
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
            {...register("billing_address.address_1", { required: true })}
            defaultValue={address1}
            errors={errors} />
          
          { (cart?.region?.currency_code == "tnd") ? (
            <NativeSelect
              {...register("billing_address.country_code", { required: true })}
              defaultValue={countryCode}
              className="hidden"
              value={"tn"}
            >
              <option hidden value="">-</option>
              {regionOptions.map((option, i) => {
                return (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                )
              })}
            </NativeSelect>
          ): (
            <NativeSelect
              {...register("billing_address.country_code", { required: true })}
              defaultValue={countryCode}
            >
              <option value="">-</option>
              {regionOptions.map((option, i) => {
                return (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                )
              })}
            </NativeSelect>
          )}
        </div>
      </AccountInfo>
    </form>
  )
}

const mapBillingAddressToFormData = ({ customer }: MyInformationProps) => {
  return {
    billing_address: {
      first_name: customer.billing_address?.first_name || undefined,
      last_name: customer.billing_address?.last_name || undefined,
      company: customer.billing_address?.company || undefined,
      address_1: customer.billing_address?.address_1 || undefined,
      address_2: customer.billing_address?.address_2 || undefined,
      city: customer.billing_address?.city || undefined,
      province: customer.billing_address?.province || undefined,
      postal_code: customer.billing_address?.postal_code || undefined,
      country_code: customer.billing_address?.country_code || undefined,
    },
  }
}

export default ProfileBillingAddress
