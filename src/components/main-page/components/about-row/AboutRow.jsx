import styles from "./about-row.module.css";
import { Link } from "react-router";

export const AboutRow = ({ aboutText, imgSrc, isInvert }) => {
  return (
    <div className={`${styles.block} ${isInvert ? styles.inverted : ""}`}>
      <div className={styles.item_text}>
        <div className={styles.st}></div>
        <p>{aboutText}</p>
        <div className={styles.en}></div>
      </div>
      <div className={styles.item_img}>
        <img src={imgSrc} alt="магазин"></img>
      </div>
    </div>
  );
};
