import { useState, useEffect } from 'react';
import medusaRequest from '../../../../lib/medusa-fetch';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

type Props = {
    textDescriptionRef: React.MutableRefObject<any>,
    imageDescriptionRef: React.MutableRefObject<any>,
    customProduct?: CustomProduct,
}
  
type CustomProduct = {
    has_text?: boolean
    has_image?: boolean
  }

export const CustomOptions: React.FC<Props> = ({ textDescriptionRef, imageDescriptionRef, customProduct }) => {
  return (
    <>
      {(customProduct?.has_text == true || customProduct?.has_image==true) ? (
        <div className="flex flex-col gap-y-1">
        <span className="text-large-semi">Personnalisation</span>
          {(customProduct?.has_text==true) && (
            <>
              <span className="text-base-semi">Description par texte</span>
              <textarea ref={textDescriptionRef} className="border rounded-md bg-gray-100 resize-none outline-none px-3 h-20" />
            </>
          )}
          {(customProduct?.has_image==true) && (
            <>
              <span className="text-base-semi">Description par image</span>
              <div className="border rounded-md p-3 bg-gray-100 overflow-hidden">
                <input ref={imageDescriptionRef} type="file" name={"imageDescription"} />
              </div>
            </>
          )}
        </div>
      ) : <></>}
    </>
  )
}