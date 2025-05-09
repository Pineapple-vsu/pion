import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./flower-page.module.css";
import { Loader } from "../loader/Loader";

export const FlowerPage = () => {
  const { id } = useParams();
  const [flower, setFlower] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [packages, setPackages] = useState([]);
  // const [selectedPackage, setSelectedPackage] = useState("");
  const [typeName, setTypeName] = useState("");
  // const [showPackageOptions, setShowPackageOptions] = useState(false);

  useEffect(() => {
    // Загружаем данные о цветке
    fetch(`/api/flower/${id}`)
      .then((res) => res.json())
      .then((data) => setFlower(data))
      .catch((error) => console.error("Ошибка загрузки цветка:", error));

    // Загружаем рекомендации по уходу
    fetch(`/api/recommendation/flower/${id}`)
      .then((res) => res.json())
      .then((data) => setRecommendation(data))
      .catch((error) => console.error("Ошибка загрузки рекомендаций:", error));

    fetch(`/api/package`)
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Ошибка загрузки упаковки:", error));

    fetch(`/api/flower/${id}/type_name`)
      .then((res) => res.json())
      .then((data) => setTypeName(data.type_name))
      .catch((error) => console.error("Ошибка загрузки типа цветка:", error));
  }, [id]);

  if (!flower || !recommendation) {
    return <Loader></Loader>;
  }
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 1 : value);
  };
  return (
    <section>
      <div className={styles.flower_page}>
        <h2>Информация о цветке</h2>
        <div className={styles.order}>
          <div className={styles.border_image}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${flower.img})` }}
            ></div>
          </div>
          <div className={styles.order_input}>
            <h3 className={styles.amount}>Название: {flower.name}</h3>
            {console.log(typeName)}
            {/* <h3 className={styles.amount}>Тип: {typeName.flower_type.name}</h3> */}
            <h3 className={styles.amount}>
              Тип: {typeName?.flower_type?.name || "Неизвестный тип"}
            </h3>
            <div className={styles.description}>
              <h3>
                Описание:<p>{flower.description}</p>
              </h3>
            </div>
            <label htmlFor="amount" className={styles.amount}>
              Количество:
            </label>
            <input type="number" id="amount" />

            {/* <input type="checkbox" id="need_pack" /> */}
            <h3>Упаковка</h3>

            {packages.map((pkg) => (
              <div key={pkg.id} className={styles.packages}>
                <input
                  type="radio"
                  name="package"
                  id={`pac-${pkg.id}`}
                  value={pkg.id}
                  defaultChecked={pkg.id === 1}
                />
                <label htmlFor={`pac-${pkg.id}`}>{pkg.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.description}>
          <h2>Рекомендации по уходу</h2>
          <p>{recommendation.description}</p>
        </div>
        <div className={styles.description}>
          <h2>Цена: </h2>
        </div>
      </div>
    </section>
  );
};
