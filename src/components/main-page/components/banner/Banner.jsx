import { ButtonLight } from "../../../buttons/button-light/ButtonLight";
import styles from "./banner.module.css";
import { Link } from "react-router";

export const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h2>Создаём любовь через цветы</h2>
        <Link to="/catalog" className={styles.button}>
          <ButtonLight>Заказать букет</ButtonLight>
        </Link>
      </div>
    </section>
  );
};
