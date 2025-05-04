import { Social } from "../buttons";
import styles from "./footer.module.css";

const copyText = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Адрес скопирован!");
    })
    .catch((err) => {
      console.error("Ошибка копирования: ", err);
    });
};

export const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.block}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <div className={styles.image}></div>
            <span>Pion</span>
          </div>
          <p>
            Цветочный магазин "Pion" — это уютное место, где каждый может найти
            идеальный букет для любого повода. Мы предлагаем широкий ассортимент
            свежих цветов, от классических роз до прекрасных тюльпанов.{" "}
          </p>
        </div>
        <div className={styles.contacts}>
          <h4>Контакты</h4>

          <a href="tel:+375290000000">
            <p>МТС: +375 (29) 00 00 000</p>
          </a>

          <a href="tel:+375290000000">
            <p>А1: +375(33) 00 00 000</p>
          </a>

          <a href="tel:000000">
            <p>Город: 000 000</p>
          </a>

          <Social
            iconSize="40"
            isInvert={false}
            className={styles.social}
          ></Social>
        </div>
        <div className={styles.adressess}>
          <h4>Наши адреса</h4>
          <p>г. Витебск:</p>
          <div className={styles.adr_list}>
            <p onClick={() => copyText("пр-т. Победы, 9")}>пр-т. Победы, 9</p>
            <p onClick={() => copyText("ул. Чкалова, 24А")}>ул. Чкалова, 24А</p>
            <p onClick={() => copyText("ул. Ленина, 5")}>ул. Ленина, 5 </p>
            <p onClick={() => copyText("пр-т. Московский, 64")}>
              пр-т. Московский, 64
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
