import styles from "./contacts.module.css";

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

export const Contacts = () => {
  return (
    <section className={styles.block} id="contacts">
      <div className={styles.vertical}></div>
      <div className={styles.left}>
        <h3>Наши пункты</h3>
        <div className={styles.content}>
          <p>Пункты самовывоза в г. Витебске:</p>
          <div className={styles.adressess}>
            <p onClick={() => copyText("пр-т. Победы, 9")}>пр-т. Победы, 9</p>
            <p onClick={() => copyText("ул. Чкалова, 24А")}>ул. Чкалова, 24А</p>
            <p onClick={() => copyText("ул. Ленина, 5")}>ул. Ленина, 5 </p>
            <p onClick={() => copyText("пр-т. Московский, 64")}>
              пр-т. Московский, 64
            </p>
          </div>
        </div>
      </div>
      <div className={styles.vertical}></div>
      <div className={styles.right}>
        <h3>Номера телефонов</h3>
        <a href="tel:+375290000000" className={styles.tel}>
          <p>МТС: +375 (29) 00 00 000</p>
        </a>
        <a href="tel:+375330000000" className={styles.tel}>
          <p>А1: +375(33) 00 00 000</p>
        </a>
        <a href="tel:000000" className={styles.tel}>
          <p>Город: 000 000</p>
        </a>
      </div>
      <div className={styles.vertical}></div>
    </section>
  );
};
