import React from "react";
import styles from "./styles.module.css"
import Quote from "@modules/common/icons/quote";
import Image from "next/image"

interface Props {
    content: any;
    backgroundImage: any;
}

const Description = (props: Props) => {
    return (
        <section
            className={styles.simpleBackground +" "+ styles.parallaxWindow}
        >
        <div className={styles.blockquoteWrapper + " flex flex-row content-center justify-center"}>
            <div className={"flex self-center justify-center"}>
                <div className={styles.blockquoteCol + " " + styles.blockquote + " bg-gradient-to-r from-purple-700 via-pink-600 to-orange-400 flex-col flex justify-center"}>
                    <Quote
                        className={styles.quotes}
                    />
                    <h4>{props.content}</h4>
                </div>
            </div>
        <div 
            className={styles.defaultOverlay + " inset-0 absolute"}
        >
            <Image
                src="/description.jpg"
                loading="eager"
                priority={true}
                quality={90}
                alt="Description Photo"
                className={"absolute inset-0"}
                draggable="false"
                fill
                sizes="500vw"
                style={{
                objectFit: "cover",
                }}
            />
        </div>
        </div>
    </section>
    )
}

export default Description;