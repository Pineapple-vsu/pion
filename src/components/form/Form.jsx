import { ButtonDark, ButtonLight } from "../buttons";
import styles from "./form.module.css";
import { Link } from "react-router";

export const Form = () => {
  return (
    <form className={styles.form}>
      <div className={styles.content}>
        <div className={styles.form_header}>
          <h2>Есть вопросы?</h2>
          <h3>
            Заполните форму или напишите нам в любую&#160;
            <a href="#social" className={styles.text_link}>
              социальную сеть
            </a>
            &#160; и мы ответим в течение 15 минут
          </h3>
        </div>
        <div className={styles.row}>
          <label htmlFor="personName" className={styles.lableText}>
            Введите имя
          </label>
          <input type="text" id="personName" placeholder="Имя" />
        </div>
        <div className={styles.row}>
          <label htmlFor="personMail" className={styles.lableText}>
            Введите email
          </label>
          <input type="email" id="personMail" placeholder="Эл. почта" />
        </div>
        <div className={styles.row}>
          <label htmlFor="personMail" className={styles.lableText}>
            Введите вопрос
          </label>
          <textarea type="text" placeholder="Вопрос" />
        </div>
        <div className={styles.row}>
          <input type="checkbox" id="agree" className={styles.check} />
          <label htmlFor="agree" className={styles.lableText}>
            Я согласен на обработку персональных данных
          </label>{" "}
        </div>
        <button type="submit">
          <ButtonDark>Отправить</ButtonDark>
        </button>
      </div>
    </form>
  );
};
