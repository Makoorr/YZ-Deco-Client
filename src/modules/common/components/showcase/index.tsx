import SkeletonCollectionShowcase from '@modules/skeletons/components/skeleton-collection-showcase';
import React from 'react';
import Image from 'next/image';

type LayoutCollection = {
    handle: string
    title: string
    imageURL: string
}

const Showcase = (content: any) => {
    const data: LayoutCollection[] = content.content;

    return (
        <div className="grid small:grid-cols-2 small:gap-x-4 grid-cols-1 gap-2 p-2">
            { (data) ? (
                (
                <>
                    <div className="border-2 rounded-md small:h-full h-64 w-fit place-self-center h-fit bg-gray-100 shadow-lg w-5/6 overflow-hidden">
                        <a href={"/collections/"+data[0].handle}>
                            {data[0].imageURL ?
                                <Image
                                src={data[0].imageURL}
                                alt={data[0].title}
                                width={800}
                                height={800}
                                />
                                : 
                                <h1>{data[0].title}</h1>
                            }
                        </a>
                    </div>
                    <div className="grid small:grid-cols-2 small:gap-4 grid-cols-1 gap-2 place-self-center w-full overflow-hidden">
                        { data.slice(1,5).map((collection, index) => (
                            <div className="border-2 rounded-md small:h-full h-64 w-fit h-fit place-self-center bg-gray-100 shadow-lg overflow-hidden" 
                                key={index}>
                                    <a href={"/collections/"+collection.handle}>
                                {collection.imageURL ?
                                    <Image
                                    src={collection.imageURL}
                                    alt={collection.title}
                                    width={700}
                                    height={700}
                                    />
                                    : 
                                    <h1>{collection.title}</h1>
                                }
                                </a>
                            </div>
                        ))}
                    </div>
                </>
            )) : (
                <SkeletonCollectionShowcase />
            )}
        </div>
    )
}

export default Showcase;