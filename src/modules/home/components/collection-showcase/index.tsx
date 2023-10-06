"use client"

import Showcase from '@modules/common/components/showcase';
import { useShowcaseCollections } from '@lib/hooks/use-layout-data';

const CollectionShowcase = () => {
    const { data } = useShowcaseCollections();

    return (
        <div className="content-container py-12">
            <Showcase
                content={data}
            />
        </div>
    )
}

export default CollectionShowcase;