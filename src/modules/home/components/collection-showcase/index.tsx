"use client"

import Showcase from '@modules/common/components/showcase';
import { useNavigationCollections } from '@lib/hooks/use-layout-data';

const CollectionShowcase = () => {
    const { data } = useNavigationCollections();

    return (
        <div className="content-container py-12">
            <Showcase
                content={data}
            />
        </div>
    )
}

export default CollectionShowcase;