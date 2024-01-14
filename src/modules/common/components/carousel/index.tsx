import React, { useState } from "react";
import styles from './styles.module.css'
import ArrowRight from "@modules/common/icons/arrow-right";
import ProductPreview from "@modules/products/components/product-preview";
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview";
import { ProductPreviewType } from "types/global";
import useWindowDimensions from "@lib/hooks/use-window-dimensions";

export const Carousel = (content: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { height, width } = useWindowDimensions();

  const updateIndex = (newIndex: number) => {
    if (data){
      (width && width>=1024) ? length = Math.ceil(data.length / 4): length = Math.ceil(data.length / 2) || (length = 1);
      if (newIndex < 0 || newIndex >= length) {
        newIndex = activeIndex;
      }
    }

    setActiveIndex(newIndex);
  };

  const data: ProductPreviewType[] = content.content;

  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | null>(null);
  var dist: number;
      
  function start (e: any) {
    setIsDown(true);
    const x = e.pageX || (e.touches && e.touches[0].pageX) || 0;
    setStartX(x);
  };
  
  function move (e: any) {
    if (!isDown) return;
    
    e.preventDefault();
    const x = e.pageX || (e.touches && e.touches[0].pageX) || 0;
    dist = x - (startX || 0);
  };

  function end() {
    setIsDown(false);
    (dist && dist >= 0 ) ? updateIndex(activeIndex - 1) : updateIndex(activeIndex + 1);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.arrow}
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
      >
            <ArrowRight
              className={styles.svgArrow}
            />
      </div>

      <ul
        className={styles.inner}
        style={{ transform: `translate(-${activeIndex * 101}%)`, cursor: 'grab' }}
        onMouseDown={start}
        onTouchStart={start}
        onMouseMove={move}
        onTouchMove={move}
        onMouseUp={end}
        onTouchEnd={end}
      >
        {data
          ? data.map((product: any) => (
                <li key={product.id}>
                  <ProductPreview voirplus={content.voirplus} {...product}/>
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

      <div
        className={styles.arrow}
        style={{
          right: 0,
        }}
        onClick={() => {
          updateIndex(activeIndex + 1);
        }}
      >
        <ArrowRight
          className={styles.svgArrowRight}
        />
      </div>
    </div>
  );
};