import SkeletonCollectionShowcase from '@modules/skeletons/components/skeleton-collection-showcase';
import React from 'react';

type LayoutCollection = {
    handle: string
    title: string
}

const Showcase = (content: any) => {
    let data: LayoutCollection[] = content.content;

    return (
        <div className="grid small:grid-cols-2 small:gap-x-4 grid-cols-1 gap-2 p-2">
            { (data) ? (
                (
                <>
                    <div className="border-2 rounded-md small:h-full h-64 small:w-full w-5/6 place-self-center bg-gray-100 shadow-lg">
                        <h1>{data[0].title}</h1>
                    </div>
                    <div className="grid small:grid-cols-2 small:gap-4 grid-cols-1 gap-2 small:place-self-start place-self-center small:h-full small:w-full w-5/6">
                        { data.slice(1,5).map((collection, index) => (
                            <div className="border-2 rounded-md small:h-96 small:h-full h-64 w-full bg-gray-100 shadow-lg" 
                                key={index}>
                                <h1>{collection.title}</h1>
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