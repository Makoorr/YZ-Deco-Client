import repeat from "@lib/util/repeat";

const SkeletonCollectionShowcase = () => {
    return (
        <>
        <div className="row-span-3 small:place-self-start place-self-center animate-pulse border-2 rounded-md h-96 w-full bg-gray-100 shadow-lg"></div>
        <div className="grid small:grid-cols-2 small:gap-4 grid-cols-1 gap-2 animate-pulse small:place-self-start place-self-center h-96 w-full shadow-lg">
            { repeat(4).map((index) => (
                <div className="border-2 rounded-md h-full w-full bg-gray-100" 
                    key={index}>
                </div>
            ))}
        </div>
        </>
    )
}

export default SkeletonCollectionShowcase;