import { Social } from "../../../buttons";
import styles from "./sails.module.css";
import { Link } from "react-router";

export const Sails = () => {
  return (
    <section className={styles.banner} id="social">
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>Подпишись и получи скидку 10%</h2>
          <p>
            Получайте интересные идеи для подарков к каждому празднику и
            полезные советы по уходу за цветами!
          </p>
        </div>
        <Social
          iconSize="70"
          isInvert={true}
          className={styles.social}
        ></Social>
      </div>
    </section>
  );
};
