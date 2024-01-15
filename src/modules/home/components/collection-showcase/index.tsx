"use client"

import Showcase from '@modules/common/components/showcase';
import { useShowcaseCollections } from '@lib/hooks/use-layout-data';

const CollectionShowcase = () => {
    const { data } = useShowcaseCollections();

    return (
        <div className="content-container py-4">
            <h1 className="font-medium text-4xl my-8">Nos Categories</h1>
            <Showcase
                content={data}
            />
        </div>
    )
}

export default CollectionShowcase;