import React from "react";
import Image from "next/image";
import UnderlineLink from "../../../common/components/underline-link";
import ArrowRight from "../../../common/icons/arrow-right";

const EventHero = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-7 my-4 md:my-16 overflow-hidden">
            
            <div className="col-span-3 flex items-center flex-col md:gap-16 gap-8 bg-red-100 px-8 pb-8 pt-8 md:pt-32 mx-16 my-0 md:mx-0 md:my-16 shadow-xl rounded-md">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl sm:text-6xl font-semibold sm:font-normal tracking-wide">Saint Valentin</h1>
                    <h4 className="text-medium sm:text-lg">Êtes-vous prêt pour la Saint Valentin?</h4>
                </div>
                
                <div className="flex flex-col justify-center tracking-normal font-normal leading-relaxed text-2xl">
                    <p>Exprimez <strong>votre amour</strong> avec une touche personnalisée de YZDeco.</p>
                    <p className="hidden md:block">Découvrez notre gamme de <strong>bijoux personnalisés</strong>, trouvez la pièce parfaite <strong>pour symboliser</strong> votre lien unique.</p>
                    <p className="hidden md:block"><strong>Avec YZDeco</strong>, votre histoire d&apos;amour devient <strong>un beau souvenir</strong>.</p>
                </div>
                
                <div className="flex text-white bg-black w-fit shadow-2xl rounded-2xl px-6 pb-1 self-center scale-90 sm:scale-125 lg:scale-120 drop-shadow-2xl">
                    <UnderlineLink
                        className="flex flex-row items-center text-lg sm:text-large-regular gap-x-4 border-current py-2 transition-all duration-300 group hover:px-4"
                        href={"/store"}
                    >
                        Acheter Maintenant
                    </UnderlineLink>
                </div>
            
            </div>

            <div className="col-span-4">
                <Image
                    src="/relationshiphero.jpg"
                    alt=""
                    className="w-full h-full"
                    width={1000}
                    height={1000}
                />
                <div className="absolute -translate-y-40 sm:-translate-y-64 md:-translate-y-96 -translate-x-1/4 md:-translate-x-1/4 right-0 text-white bg-black/30 shadow-2xl rounded-2xl px-6 pb-2 shadow-2xl scale-100 sm:scale-125 lg:scale-90 drop-shadow-2xl">
                    <UnderlineLink
                        arrow={false}
                        className="flex items-center text-large-regular border-b border-current gap-x-2 py-2 transition-all duration-300 group hover:px-4"
                        href={"/collections/cadeau-homme"}
                    >
                        <div className="flex gap-2 items-center">
                            <ArrowRight
                                size={20}
                                className="transition-all group-hover:ml-2 duration-300 rotate-180"
                            />
                            Pour Lui
                        </div>
                    </UnderlineLink>
                </div>
                <div className="absolute -translate-y-40 sm:-translate-y-64 md:-translate-y-96 translate-x-1/4 sm:translate-x-1/2 md:translate-x-3/4 text-white bg-black/30 shadow-2xl rounded-2xl px-6 pb-2 shadow-2xl scale-100 sm:scale-125 lg:scale-90 drop-shadow-2xl">
                    <UnderlineLink
                        className="flex items-center text-large-regular border-b border-current gap-x-2 py-2 transition-all duration-300 group hover:px-4"
                        href={"/collections/cadeau-femme"}
                    >
                        Pour Elle
                    </UnderlineLink>
                </div>
            </div>
        </div>
    )
}
export default EventHero;