import styles from "./info-item.module.css";
import { Link } from "react-router";

export const InfoItem = ({ imgSrc, children, contentText }) => {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={imgSrc} alt={children} />
      </div>
      <div className={styles.text}>
        <h4>{children}</h4>
        <p>{contentText}</p>
      </div>
    </div>
  );
};
