import { Children } from "react";
import { ButtonLight } from "../buttons";
import styles from "./flower-card.module.css";
import { Link } from "react-router";

export const FlowerCard = ({ flower: { id, name, img } }) => {
  return (
    <div className={styles.block}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <Link to={`/flower/${id}`}>
          <ButtonLight>Купить</ButtonLight>
        </Link>
      </div>
    </div>
  );
};
