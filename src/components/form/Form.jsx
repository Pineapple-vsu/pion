import styles from "./form.module.css";

export const Form = ({ children }) => {
  return (
    <div className={styles.form}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
