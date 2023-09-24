import OrderOverview from "../components/order-overview"

const OrdersTemplate = () => {
  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Mes commandes</h1>
        <p className="text-base-regular">
        Consultez vos commandes précédentes et leur statut. Vous pouvez également créer des retours ou des échanges pour vos commandes si nécessaire.
        </p>
      </div>
      <div>
        <OrderOverview />
      </div>
    </div>
  )
}

export default OrdersTemplate
