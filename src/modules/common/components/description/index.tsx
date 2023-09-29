import React from "react";
import styles from "./styles.module.css"
import Quote from "@modules/common/icons/quote";

interface Props {
    content: any;
    backgroundImage: any;
}

const Description = (props: Props) => {
    return (
        <section
            className={styles.blockquoteSectionType1 +" "+ styles.simpleBackground +" "+ styles.parallaxWindow +" "+ styles.defaultOverlay}
            style={{backgroundImage: "url("+props.backgroundImage+")", backgroundSize: "cover", backgroundPosition: "center center"}}
        >
        <div className={styles.blockquoteWrapper + " flex flex-row content-center justify-center"}>
            <div className={"flex self-center justify-center"}>
                <div className={styles.blockquoteCol + " " + styles.blockquote + " bg-amber-700 flex-col flex justify-center"}>
                    <Quote
                        className={styles.quotes}
                    />
                    <h4>{props.content}</h4>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Description;