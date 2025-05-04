import styles from "./header.module.css";
import { Link } from "react-router";

export const Header = () => {
  return (
    <section className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.image}></div>
          <span>Pion</span>
        </div>
        <nav className={styles.navigation}>
          <Link to="/">Главная</Link>

          <Link to="/catalog">Каталог</Link>

          <Link to="/#about">О нас</Link>

          <Link to="/#contacts">Контакты</Link>

          <Link to="/#social">Соцсети</Link>
        </nav>
      </div>
    </section>
  );
};
