import { ButtonLight } from "../../../buttons/button-light/ButtonLight";
import { InfoItem } from "../info-item/InfoItem";
import styles from "./info.module.css";
import { Link } from "react-router";

export const Info = () => {
  return (
    <section>
      <div className={styles.items}>
        <InfoItem
          imgSrc={"/src/assets/iconoir_medal.svg"}
          contentText={"Каждые 3 дня у нас поставка свежих цветов"}
        >
          Гарантия качества
        </InfoItem>
        <InfoItem
          imgSrc={"/src/assets/lets-icons_img-box-light.svg"}
          contentText={"Отправляем бесплатное фото вашего букета до доставки"}
        >
          Фотоотчёт
        </InfoItem>
        <InfoItem
          imgSrc={"/src/assets/iconamoon_gift-thin.svg"}
          contentText={"Каждую неделю выбираются букеты недели по скидке"}
        >
          Приятные бонусы
        </InfoItem>
      </div>
    </section>
  );
};
