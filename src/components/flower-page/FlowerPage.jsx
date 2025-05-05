// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import styles from "./flower-page.module.css";

// export const FlowerPage = () => {
//   const { id } = useParams();
//   const [flower, setFlower] = useState(null);

//   useEffect(() => {
//     fetch(`/api/flower/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Полученные данные:", data);
//         setFlower(data);
//       })
//       .catch((error) => console.error("Ошибка загрузки:", error));
//   }, [id]);

//   if (!flower) {
//     return <p>Загрузка данных...</p>;
//   }

//   return (
//     <section>
//       <div className={styles.flower_page}>
//         <h2>Информация по цветку</h2>
//         <div className={styles.content}>
//           <img src={flower.img} alt={flower.name} />
//           <h3>Название: {flower.name}</h3>
//           <h3>Тип: {flower.flower_type_id}</h3>
//           <label htmlFor="amount">Количество</label>
//           <input type="number" id="amount" />
//           <input type="checkbox" id="package" />
//           <label htmlFor="package">Упаковка</label>
//         </div>
//         <div className={styles.description}>
//           <h3>Описание:</h3>
//           <p>{flower.description}</p>
//           <h3>Рекомендации по уходу:</h3>
//           <p>{flower.description}</p>
//         </div>
//       </div>
//     </section>
//   );
// };
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./flower-page.module.css";

export const FlowerPage = () => {
  const { id } = useParams();
  const [flower, setFlower] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [typeName, setTypeName] = useState("");

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
      .then((data) => setTypeName(data.type_name)) // Теперь `type_name` приходит корректно!
      .catch((error) => console.error("Ошибка загрузки типа цветка:", error));
  }, [id]);

  if (!flower || !recommendation) {
    return <p>Загрузка...</p>;
  }

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

            <label htmlFor="amount" className={styles.amount}>
              Количество:
            </label>
            <input type="number" id="amount" />

            <input type="checkbox" id="need_pack" />
            <label htmlFor="need_pack" className={styles.amount}>
              Упаковка
            </label>

            {/* <select
              id="package"
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
            >
              <option value="">Выберите упаковку</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.material}
                </option>
              ))}
            </select> */}
            <form className={styles.package_list}>
              {packages.map((pkg) => (
                <div key={pkg.id} className={styles.package_item}>
                  <input
                    type="radio"
                    id={`package-${pkg.id}`}
                    name="package"
                    value={pkg.id}
                    checked={selectedPackage === pkg.id}
                    onChange={() => setSelectedPackage(pkg.id)}
                  />
                  <label htmlFor={`package-${pkg.id}`}>{pkg.material}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        <div className={styles.description}>
          <h2>Описание:</h2>
          <p>{flower.description}</p>
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
