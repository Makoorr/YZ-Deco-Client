import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError("Veuillez vérifier vos coordonnées.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm flex flex-col items-center mt-12">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <h1 className="text-large-semi uppercase mb-6">Devenir membre de Y&Z Deco</h1>
      <p className="text-center text-base-regular text-gray-700 mb-4">
      Créez votre profil et accédez à une expérience d&apos;achat améliorée.
      </p>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Prénom"
            {...register("first_name", { required: "Prénom est requis" })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label="Nom"
            {...register("last_name", { required: "Nom est requis" })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label="Email"
            {...register("email", { required: "Email est requis" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Phone"
            {...register("phone")}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            label="Mot de passe"
            {...register("password", {
              required: "Mot de passe est requis",
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              Veuillez vérifier vos coordonnées
            </span>
          </div>
        )}
        <span className="text-center text-gray-700 text-small-regular mt-6">
          En créant un compte, vous acceptez{" "}
          <Link href="/content/privacy-policy" className="underline">
          les conditions d&apos;utilisation
          </Link>{" "}
          et notre {" "}
          <Link href="/content/terms-of-use" className="underline">
          politique de confidentialité
          </Link> {" "}
          de Y&Z Deco.
        </span>
        <Button className="mt-6">Rejoignez-nous</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        Déjà membre?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Se connecter
        </button>
        .
      </span>
    </div>
  )
}

export default Register
