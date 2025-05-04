import styles from "./button-light.module.css";
import { Link } from "react-router";

export const ButtonLight = ({ children }) => {
  return <div className={styles.light}>{children}</div>;
};
