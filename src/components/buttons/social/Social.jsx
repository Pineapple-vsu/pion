import styles from "./social.module.css";
import { Link } from "react-router";

export const Social = ({ iconSize, isInvert }) => {
  return (
    <div
      className={styles.social}
      style={{
        height: iconSize + "px",
        width: iconSize * 4 + 60 + "px",
      }}
    >
      <a
        href=""
        className={`${styles.tg} ${styles.icon} ${
          isInvert ? styles.inverted : ""
        }`}
        style={{
          height: iconSize + "px",
          width: iconSize + "px",
        }}
      ></a>
      <a
        href=""
        className={`${styles.vk} ${styles.icon} ${
          isInvert ? styles.inverted : ""
        }`}
        style={{ height: iconSize + "px", width: iconSize + "px" }}
      ></a>
      <a
        href=""
        className={`${styles.inst} ${styles.icon} ${
          isInvert ? styles.inverted : ""
        }`}
        style={{ height: iconSize + "px", width: iconSize + "px" }}
      ></a>
      <a
        href=""
        className={`${styles.mail} ${styles.icon} ${
          isInvert ? styles.inverted : ""
        }`}
        style={{ height: iconSize + "px", width: iconSize + "px" }}
      ></a>
    </div>
  );
};
