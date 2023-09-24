import UnderlineLink from "@modules/common/components/underline-link"

const EmptyCartMessage = () => {
  return (
    <div className="bg-amber-100 px-8 py-24 flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl-semi">Votre panier est vide</h1>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
      Vous n&apos;avez rien dans votre sac. Utilisez le lien ci-dessous pour commencer à parcourir nos produits.
      </p>
      <div>
        <UnderlineLink href="/store">Explorer nos produits</UnderlineLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
