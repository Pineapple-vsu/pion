// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import styles from "./flower-page.module.css";
// import { Loader } from "../loader/Loader";
// import { ButtonLight } from "../buttons";

// export const FlowerPage = () => {
//   const { id } = useParams();
//   const [flower, setFlower] = useState(null);
//   const [recommendation, setRecommendation] = useState(null);
//   const [packages, setPackages] = useState([]);
//   const [selectedPackage, setSelectedPackage] = useState(""); // Если упаковка не выбрана—пустая строка
//   const [typeName, setTypeName] = useState("");
//   const [quantity, setQuantity] = useState(""); // Начинаем с пустой строки
//   const [quantityError, setQuantityError] = useState("");

//   useEffect(() => {
//     // Загружаем данные о цветке
//     fetch(`/api/flower/${id}`)
//       .then((res) => res.json())
//       .then((data) => setFlower(data))
//       .catch((error) => console.error("Ошибка загрузки цветка:", error));

//     // Загружаем рекомендации по уходу
//     fetch(`/api/recommendation/flower/${id}`)
//       .then((res) => res.json())
//       .then((data) => setRecommendation(data))
//       .catch((error) => console.error("Ошибка загрузки рекомендаций:", error));

//     // Загружаем список упаковок
//     fetch(`/api/package`)
//       .then((res) => res.json())
//       .then((data) => setPackages(data))
//       .catch((error) => console.error("Ошибка загрузки упаковки:", error));

//     // Загружаем название типа цветка
//     fetch(`/api/flower/${id}/type_name`)
//       .then((res) => res.json())
//       .then((data) => setTypeName(data.type_name))
//       .catch((error) => console.error("Ошибка загрузки типа цветка:", error));
//   }, [id]);

//   // Если упаковки загружены, и ничего не выбрано, можно установить упаковку по умолчанию
//   useEffect(() => {
//     if (packages.length > 0 && !selectedPackage) {
//       setSelectedPackage(packages[0].id);
//     }
//   }, [packages, selectedPackage]);

//   if (!flower || !recommendation) {
//     return <Loader />;
//   }

//   // Обработчик изменения количества
//   const handleQuantityChange = (e) => {
//     const { value } = e.target;
//     if (value === "") {
//       setQuantity("");
//       setQuantityError("");
//       return;
//     }
//     const numericValue = Number(value);
//     if (numericValue < 1) {
//       setQuantity(numericValue);
//       setQuantityError("Количество не может быть меньше 1");
//     } else {
//       setQuantity(numericValue);
//       setQuantityError("");
//     }
//   };

//   // Находим выбранную упаковку, если она выбрана
//   const selectedPkg = packages.find(
//     (pkg) => String(pkg.id) === String(selectedPackage)
//   );

//   // Рассчитываем стоимость
//   const flowerCost = Number(flower.cost) || 0;
//   const packagingCost = selectedPkg ? Number(selectedPkg.cost) || 0 : 0;
//   // Если количество пустое или меньше 1, считаем его как 0 для расчёта (или можно выводить ошибку)
//   const validQuantity = quantity >= 1 ? quantity : 0;
//   const totalPrice = flowerCost * validQuantity + packagingCost;

//   return (
//     <section>
//       <div className={styles.flower_page}>
//         <h2>Информация о цветке</h2>
//         <div className={styles.order}>
//           <div className={styles.border_image}>
//             <div
//               className={styles.image}
//               style={{ backgroundImage: `url(${flower.img})` }}
//             ></div>
//           </div>
//           <div className={styles.order_input}>
//             <h3 className={styles.amount}>Название: {flower.name}</h3>
//             <h3 className={styles.amount}>
//               Тип: {typeName?.flower_type?.name || "Неизвестный тип"}
//             </h3>
//             <div className={styles.description}>
//               <h3>Описание:</h3>
//               <p>{flower.description}</p>
//             </div>
//             <label htmlFor="amount" className={styles.amount}>
//               Количество:
//             </label>
//             <input
//               type="number"
//               id="amount"
//               placeholder="Введите количество"
//               value={quantity}
//               onChange={handleQuantityChange}
//             />
//             {quantityError && (
//               <p style={{ color: "red", fontSize: "18px" }}>{quantityError}</p>
//             )}

//             <h3>Упаковка</h3>
//             {packages.map((pkg) => (
//               <div key={pkg.id} className={styles.packages}>
//                 <input
//                   type="radio"
//                   name="package"
//                   id={`pac-${pkg.id}`}
//                   value={pkg.id}
//                   checked={String(selectedPackage) === String(pkg.id)}
//                   onChange={(e) => setSelectedPackage(e.target.value)}
//                   onWheel={(e) => e.preventDefault()}
//                 />
//                 <label htmlFor={`pac-${pkg.id}`}>{pkg.name}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={styles.description}>
//           <h2>Рекомендации по уходу</h2>
//           <p>{recommendation.description}</p>
//         </div>

//         <div className={styles.results}>
//           <h2>Цена: {totalPrice.toFixed(2)}</h2>
//           <div></div>
//           <ButtonLight>Оформить заказ</ButtonLight>
//         </div>
//       </div>
//     </section>
//   );
// };

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import styles from "./flower-page.module.css";
// import { Loader } from "../loader/Loader";
// import { ButtonLight } from "../buttons";

// export const FlowerPage = () => {
//   const { id } = useParams();
//   const [flower, setFlower] = useState(null);
//   const [recommendation, setRecommendation] = useState(null);
//   const [packages, setPackages] = useState([]);
//   const [selectedPackage, setSelectedPackage] = useState(""); // Если упаковка не выбрана — пустая строка
//   const [typeName, setTypeName] = useState("");
//   const [quantity, setQuantity] = useState(""); // Начинаем с пустой строки
//   const [quantityError, setQuantityError] = useState("");
//   const [orderError, setOrderError] = useState("");
//   const [orderSuccess, setOrderSuccess] = useState("");

//   useEffect(() => {
//     // Загружаем данные о цветке
//     fetch(`/api/flower/${id}`)
//       .then((res) => res.json())
//       .then((data) => setFlower(data))
//       .catch((error) => console.error("Ошибка загрузки цветка:", error));

//     // Загружаем рекомендации по уходу
//     fetch(`/api/recommendation/flower/${id}`)
//       .then((res) => res.json())
//       .then((data) => setRecommendation(data))
//       .catch((error) => console.error("Ошибка загрузки рекомендаций:", error));

//     // Загружаем список упаковок
//     fetch(`/api/package`)
//       .then((res) => res.json())
//       .then((data) => setPackages(data))
//       .catch((error) => console.error("Ошибка загрузки упаковки:", error));

//     // Загружаем название типа цветка
//     fetch(`/api/flower/${id}/type_name`)
//       .then((res) => res.json())
//       .then((data) => setTypeName(data.type_name))
//       .catch((error) => console.error("Ошибка загрузки типа цветка:", error));
//   }, [id]);

//   // Если упаковки загружены, и ничего не выбрано, можно установить упаковку по умолчанию
//   useEffect(() => {
//     if (packages.length > 0 && !selectedPackage) {
//       setSelectedPackage(packages[0].id);
//     }
//   }, [packages, selectedPackage]);

//   if (!flower || !recommendation) {
//     return <Loader />;
//   }

//   // Обработчик изменения количества
//   const handleQuantityChange = (e) => {
//     const { value } = e.target;
//     if (value === "") {
//       setQuantity("");
//       setQuantityError("");
//       return;
//     }
//     const numericValue = Number(value);
//     if (numericValue < 1) {
//       setQuantity(numericValue);
//       setQuantityError("Количество не может быть меньше 1");
//     } else {
//       setQuantity(numericValue);
//       setQuantityError("");
//     }
//   };

//   // Находим выбранную упаковку (если таковая выбрана)
//   const selectedPkg = packages.find(
//     (pkg) => String(pkg.id) === String(selectedPackage)
//   );

//   // Стоимость одного цветка из поля cost
//   const flowerCost = Number(flower.cost) || 0;
//   // Если упаковка выбрана, берем её стоимость (из поля cost), иначе 0
//   const packagingCost = selectedPkg ? Number(selectedPkg.cost) || 0 : 0;
//   // Если количество пустое или меньше 1, считаем его как 0 для расчёта
//   const validQuantity = quantity >= 1 ? quantity : 0;
//   // Общая стоимость рассчитывается по формуле:
//   // (flowerCost * validQuantity) + (если упаковка выбрана, упаковка стоит pkg.cost)
//   const totalPrice =
//     flowerCost * validQuantity + (selectedPackage ? packagingCost : 0);

//   // Функция отправки заказа
//   const handleOrder = () => {
//     // Если количество не задано корректно, не отправляем заказ
//     if (!quantity || Number(quantity) < 1) {
//       setOrderError("Пожалуйста, укажите корректное количество");
//       return;
//     }
//     setOrderError("");
//     setOrderSuccess("");

//     // Собираем данные заказа (букета)
//     const orderData = {
//       flower_id: flower.id, // ID цветка
//       count: Number(quantity), // Количество
//       cost: totalPrice, // Итоговая стоимость
//       package_id: selectedPackage ? Number(selectedPackage) : null, // ID упаковки, или null если не выбрана
//     };

//     // Отправляем POST-запрос на маршрут создания букета (например, '/api/posy')
//     fetch("/api/posy", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(orderData),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Ошибка при создании заказа");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Заказ создан:", data);
//         setOrderSuccess("Заказ успешно оформлен!");
//       })
//       .catch((error) => {
//         console.error("Ошибка при оформлении заказа:", error);
//         setOrderError(error.message);
//       });
//   };

//   return (
//     <section>
//       <div className={styles.flower_page}>
//         <h2>Информация о цветке</h2>
//         <div className={styles.order}>
//           <div className={styles.border_image}>
//             <div
//               className={styles.image}
//               style={{ backgroundImage: `url(${flower.img})` }}
//             ></div>
//           </div>
//           <div className={styles.order_input}>
//             <h3 className={styles.amount}>Название: {flower.name}</h3>
//             <h3 className={styles.amount}>
//               Тип: {typeName?.flower_type?.name || "Неизвестный тип"}
//             </h3>
//             <div className={styles.description}>
//               <h3>Описание:</h3>
//               <p>{flower.description}</p>
//             </div>
//             <label htmlFor="amount" className={styles.amount}>
//               Количество:
//             </label>
//             <input
//               type="number"
//               id="amount"
//               placeholder="Введите количество"
//               value={quantity}
//               onChange={handleQuantityChange}
//               onWheel={(e) => e.preventDefault()}
//             />
//             {quantityError && (
//               <p style={{ color: "red", fontSize: "18px" }}>{quantityError}</p>
//             )}

//             <h3>Упаковка</h3>
//             {packages.map((pkg) => (
//               <div key={pkg.id} className={styles.packages}>
//                 <input
//                   type="radio"
//                   name="package"
//                   id={`pac-${pkg.id}`}
//                   value={pkg.id}
//                   checked={String(selectedPackage) === String(pkg.id)}
//                   onChange={(e) => setSelectedPackage(e.target.value)}
//                   onWheel={(e) => e.preventDefault()}
//                 />
//                 <label htmlFor={`pac-${pkg.id}`}>{pkg.name}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={styles.description}>
//           <h2>Рекомендации по уходу</h2>
//           <p>{recommendation.description}</p>
//         </div>

//         <div className={styles.results}>
//           <h2>Цена: {totalPrice.toFixed(2)} руб.</h2>
//           {/* {orderError && (
//             <p style={{ color: "red", fontSize: "18px" }}>{orderError}</p>
//           )}
//           {orderSuccess && (
//             <p style={{ color: "green", fontSize: "18px" }}>{orderSuccess}</p>
//           )} */}

//           <div onClick={handleOrder}>
//             <ButtonLight>Оформить заказ</ButtonLight>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./flower-page.module.css";
import { Loader } from "../loader/Loader";
import { ButtonLight } from "../buttons";

export const FlowerPage = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(""); // Если упаковка не выбрана — пустая строка
  const [typeName, setTypeName] = useState("");
  const [quantity, setQuantity] = useState(""); // Начинаем с пустой строки
  const [quantityError, setQuantityError] = useState("");
  // const [orderError, setOrderError] = useState("");

  // const [orderSuccess, setOrderSuccess] = useState("");

  const quantityInputRef = useRef(null);

  // Отключаем изменение через колесико
  useEffect(() => {
    const inputElem = quantityInputRef.current;
    if (inputElem) {
      const handleWheel = (event) => {
        event.preventDefault();
      };
      inputElem.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        inputElem.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

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

    // Загружаем список упаковок
    fetch(`/api/package`)
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Ошибка загрузки упаковки:", error));

    // Загружаем название типа цветка
    fetch(`/api/flower/${id}/type_name`)
      .then((res) => res.json())
      .then((data) => setTypeName(data.type_name))
      .catch((error) => console.error("Ошибка загрузки типа цветка:", error));
  }, [id]);

  // Если упаковки загружены, и ничего не выбрано, можно установить упаковку по умолчанию
  useEffect(() => {
    if (packages.length > 0 && !selectedPackage) {
      setSelectedPackage(packages[0].id);
    }
  }, [packages, selectedPackage]);

  if (!flower || !recommendation) {
    return <Loader />;
  }

  // Обработчик изменения количества
  const handleQuantityChange = (e) => {
    const { value } = e.target;
    if (value === "") {
      setQuantity("");
      setQuantityError("");
      return;
    }
    const numericValue = Number(value);
    if (numericValue < 1) {
      setQuantity(numericValue);
      setQuantityError("Количество не может быть меньше 1");
    } else {
      setQuantity(numericValue);
      setQuantityError("");
    }
  };

  // Находим выбранную упаковку (если выбранная упаковка существует)
  const selectedPkg = packages.find(
    (pkg) => String(pkg.id) === String(selectedPackage)
  );

  // Стоимость одного цветка (берем поле cost из flower)
  const flowerCost = Number(flower.cost) || 0;
  // Если упаковка выбрана, берем стоимость упаковки из pkg.cost; если не выбрана — считаем 0
  const packagingCost = selectedPkg ? Number(selectedPkg.cost) || 0 : 0;
  const validQuantity = quantity >= 1 ? quantity : 0;
  // Итоговая стоимость: (цена цветка × количество) + (если упаковка выбрана, добавить цену упаковки букета)
  const totalPrice =
    flowerCost * validQuantity + (selectedPackage ? packagingCost : 0);

  // Функция отправки заказа
  // const handleOrder = () => {

  //   console.log("handleOrder вызван", {
  //     flower_id: flower.id,
  //     count: quantity,
  //     cost: totalPrice,
  //     package_id: selectedPackage ? Number(selectedPackage) : null,
  //   });
  //   if (!quantity || Number(quantity) < 1) {
  //     setOrderError("Пожалуйста, укажите корректное количество");
  //     return;
  //   }
  //   setOrderError("");
  //   // setOrderSuccess("");

  //   const orderData = {
  //     flower_id: flower.id,
  //     count: Number(quantity),
  //     cost: totalPrice,
  //     package_id: selectedPackage ? Number(selectedPackage) : null,
  //   };

  //   fetch("/api/posy", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(orderData),
  //   })
  //     .then((res) => {
  //       console.log("Ответ от сервера:", res);
  //       if (!res.ok) {
  //         throw new Error("Ошибка при создании заказа: " + res.status);
  //       }
  //       const contentType = res.headers.get("content-type");
  //       if (contentType && contentType.indexOf("application/json") !== -1) {
  //         return res.json();
  //       }
  //       return {};
  //     })
  //     .then((data) => {
  //       console.log("Заказ создан:", data);
  //       // setOrderSuccess("Заказ успешно оформлен!");
  //       // После успешного создания, перенаправляем пользователя
  //       navigate("/order");
  //     })
  //     .catch((error) => {
  //       console.error("Ошибка при оформлении заказа:", error);
  //       setOrderError(error.message);
  // });
  // };

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
            <h3 className={styles.amount}>
              Тип: {typeName?.flower_type?.name || "Неизвестный тип"}
            </h3>
            <div className={styles.description}>
              <h3>Описание: {flower.description}</h3>
            </div>
            <label htmlFor="amount" className={styles.amount}>
              Количество:
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Введите количество"
              value={quantity}
              onChange={handleQuantityChange}
              onWheel={(e) => e.preventDefault()}
              ref={quantityInputRef}
            />
            {quantityError && (
              <p style={{ color: "red", fontSize: "18px" }}>{quantityError}</p>
            )}

            <h3>Упаковка</h3>
            {packages.map((pkg) => (
              <div key={pkg.id} className={styles.packages}>
                <input
                  type="radio"
                  name="package"
                  id={`pac-${pkg.id}`}
                  value={pkg.id}
                  checked={String(selectedPackage) === String(pkg.id)}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  onWheel={(e) => e.preventDefault()}
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

        <div className={styles.results}>
          <h2>Цена: {totalPrice.toFixed(2)} </h2>
          <Link to="/order">
            {/* <div onClick={handleOrder}> */}
            <ButtonLight>Оформить заказ</ButtonLight>
            {/* </div> */}
          </Link>
        </div>
      </div>
    </section>
  );
};
