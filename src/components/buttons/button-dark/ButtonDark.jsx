import styles from "./button-dark.module.css";
import { Link } from "react-router";

export const ButtonDark = ({ children }) => {
  return <div className={styles.dark}>{children}</div>;
};
