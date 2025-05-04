import { Children } from "react";
import { ButtonLight } from "../buttons";
import styles from "./flower.module.css";
import { Link } from "react-router";

export const Flower = ({ flower: { id, name, img } }) => {
  return (
    <div className={styles.block}>
      <div className={styles.image} style={{ backgroundImage: `url(${img})` }}>
        {/* <img src={img} alt="цветок" /> */}
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <Link to={`/flower/${id}`}>
          <ButtonLight>Купить</ButtonLight>
        </Link>
      </div>
    </div>
  );
};
