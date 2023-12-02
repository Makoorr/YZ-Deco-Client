import SkeletonCollectionShowcase from '@modules/skeletons/components/skeleton-collection-showcase';
import React from 'react';
import Image from 'next/image';
import UnderlineLink from '../underline-link';

type LayoutCollection = {
    handle: string
    title: string
    imageURL: string
}

const Showcase = (content: any) => {
    const data: LayoutCollection[] = content.content;

    if (data != undefined && data.length > 0 && data[0]?.handle && data[0]?.imageURL) 
        return (
            <div className="grid small:grid-cols-2 small:gap-x-4 grid-cols-1 gap-2 p-2">
                <div className="border-2 rounded-md small:h-full h-64 w-fit place-self-center h-fit bg-gray-100 shadow-lg w-5/6 overflow-hidden">
                    <a href={"/collections/"+data[0]?.handle}>
                        {data[0]?.imageURL ?
                            <Image
                            src={data[0]?.imageURL}
                            alt={data[0]?.title}
                            width={800}
                            height={800}
                            />
                            : 
                            <h1>{data[0]?.title}</h1>
                        }
                    </a>
                        <div className="absolute -translate-y-28 translate-x-4 sm:translate-x-8 md:translate-x-24 lg:translate-x-4 text-white bg-black/30 shadow-2xl rounded-2xl small:pb-3 px-4 pb-2 shadow-2xl scale-100 sm:scale-125 lg:scale-90 drop-shadow-2xl">
                            <UnderlineLink href={"/collections/"+data[0]?.handle}>{data[0]?.title}</UnderlineLink>
                        </div>
                </div>
                <div className="grid small:grid-cols-2 small:gap-4 grid-cols-1 gap-2 place-self-center w-full overflow-hidden">
                    { data.slice(1,5).map((collection, index) => (
                        <div className="border-2 rounded-md small:h-full h-64 w-fit h-fit place-self-center bg-gray-100 shadow-lg overflow-hidden" 
                            key={index}>
                                <a href={"/collections/"+collection?.handle}>
                            {collection?.imageURL ?
                                <Image
                                src={collection?.imageURL}
                                alt={collection?.title}
                                width={700}
                                height={700}
                                />
                                : 
                                <h1>{collection?.title}</h1>
                            }
                            </a>
                            <div className="absolute -translate-y-28 translate-x-4 sm:translate-x-8 md:translate-x-12 lg:translate-x-0 text-white bg-black/30 shadow-2xl rounded-2xl px-2 pb-2 shadow-2xl scale-100 sm:scale-125 lg:scale-90 drop-shadow-2xl">
                                <UnderlineLink href={"/collections/"+collection?.handle}>{collection?.title}</UnderlineLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )

    return (
        <div className="grid small:grid-cols-2 small:gap-x-4 grid-cols-1 gap-2 p-2">
            <SkeletonCollectionShowcase />
        </div>
    )
}

export default Showcase;