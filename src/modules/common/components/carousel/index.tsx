import React, { useState } from "react";
import styles from './styles.module.css'
import ArrowRight from "@modules/common/icons/arrow-right";
// import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data";
import ProductPreview from "@modules/products/components/product-preview";
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview";
import { ProductPreviewType } from "types/global";

export const Carousel = (content: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: number) => {
    if (data){
      length = data.length / 4;
      if (newIndex < 0) {
        newIndex = length - 1;
      } else if (newIndex >= length) {
        newIndex = 0;
      }
    }

    setActiveIndex(newIndex);
  };

  const data: ProductPreviewType[] = content.content;

  return (
    <div className={styles.carousel + " overflow-hidden"}>
      <button
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
      >
        <div>
          <ArrowRight
            transform= "rotate(180)"
          />
        </div>{" "}
      </button>
      <ul
        className={styles.inner}
        style={{ transform: `translate(-${activeIndex * 100}%)`}}
      >
        {data
          ? data.map((product: any) => (
                <li key={product.id}>
                  <ProductPreview {...product}/>
                </li>
            ))
          : (
            Array.from(Array(4).keys()).map((i) => (
              <li key={i}>
                <SkeletonProductPreview />
              </li>
          )))
        }
      </ul>
      <button
        onClick={() => {
          updateIndex(activeIndex + 1);
        }}
      >
        <span className={styles.materialSymbolsOutlined}>
          <ArrowRight/>
        </span>
      </button>
    </div>
  );
};