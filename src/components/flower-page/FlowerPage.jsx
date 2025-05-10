import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./flower-page.module.css";
import { Loader } from "../loader/Loader";
import { ButtonLight } from "../buttons";

export const FlowerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(""); // Если упаковка не выбрана — пустая строка
  const [typeName, setTypeName] = useState("");
  const [quantity, setQuantity] = useState(1); // Теперь по умолчанию 1

  const [quantityError, setQuantityError] = useState("");
  const [orderError, setOrderError] = useState("");

  const quantityInputRef = useRef(null);

  // Отключаем изменение через колесико мыши
  useEffect(() => {
    if (quantityInputRef.current) {
      const handleWheel = (event) => {
        if (document.activeElement === quantityInputRef.current) {
          event.preventDefault(); // Запрещает изменение значения
        }
      };
      quantityInputRef.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });

      return () => {
        quantityInputRef.current.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  useEffect(() => {
    // Загружаем данные о цветке
    fetch(`/api/flower/${id}`)
      .then((res) => res.json())
      .then((data) => setFlower(data))
      .catch((error) => console.error("Ошибка загрузки цветка:", error));

    // Загружаем список упаковок
    fetch(`/api/package`)
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Ошибка загрузки упаковки:", error));
  }, [id]);

  useEffect(() => {
    if (flower) {
      // Запрашиваем данные типа цветка через API
      fetch(`/api/flower_type/${flower.flower_type_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.name) {
            setTypeName(data.name); // Сохраняем название типа цветка
          } else {
            throw new Error("Тип цветка не найден");
          }
        })
        .catch((error) => console.error("Ошибка загрузки типа цветка:", error));
    }
  }, [flower]);

  useEffect(() => {
    if (flower) {
      fetch(`/api/recommendation/flower/${flower.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.description) {
            setRecommendation(data.description);
          } else {
            throw new Error("Описание рекомендации отсутствует");
          }
        })
        .catch((error) =>
          console.error("Ошибка загрузки рекомендации:", error)
        );
    }
  }, [flower]);

  // Если упаковки загружены, и ничего не выбрано, устанавливаем упаковку по умолчанию
  useEffect(() => {
    if (packages.length > 0 && !selectedPackage) {
      setSelectedPackage(packages[0].id);
    }
  }, [packages, selectedPackage]);

  if (!flower) {
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

  // Находим выбранную упаковку (если она существует)
  const selectedPkg = packages.find(
    (pkg) => String(pkg.id) === String(selectedPackage)
  );

  // Расчет итоговой стоимости
  const flowerCost = Number(flower.cost) || 0;
  const packagingCost = selectedPkg ? Number(selectedPkg.cost) || 0 : 0;
  const validQuantity = quantity >= 1 ? quantity : 0;
  const totalPrice =
    flowerCost * validQuantity + (selectedPackage ? packagingCost : 0);

  // Функция отправки заказа (создания букета)
  const handleOrder = () => {
    console.log("handleOrder вызван", {
      flower_id: flower.id,
      count: quantity,
      cost: totalPrice,
      package_id: selectedPackage ? Number(selectedPackage) : null,
    });
    if (!quantity || Number(quantity) < 1) {
      setOrderError("Пожалуйста, укажите корректное количество");
      return;
    }
    setOrderError("");

    const posyDataPayload = {
      flower_id: flower.id,
      count: Number(quantity),
      cost: totalPrice,
      package_id: selectedPackage ? Number(selectedPackage) : null,
    };

    fetch("/api/posy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posyDataPayload),
    })
      .then((res) => {
        console.log("Ответ от сервера:", res);
        if (!res.ok) {
          throw new Error("Ошибка при создании букета: " + res.status);
        }
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        }
        return {};
      })
      .then((data) => {
        console.log("Букет создан:", data);
        // Передаём созданный id букета (data.id) во навигационное состояние, чтобы использовать его в OrderPage
        navigate("/order", { state: { posyId: data.id } });
      })
      .catch((error) => {
        console.error("Ошибка при оформлении букета:", error);
        setOrderError(error.message);
      });
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
            <h3 className={styles.amount}>
              Тип: {typeName || "Неизвестный тип"}
            </h3>
            <div className={styles.description}>
              <h3>Описание: {flower.description}</h3>
            </div>
            <div className={styles.quantity}>
              <label htmlFor="amount" className={styles.amount}>
                Количество:
              </label>
              <input
                type="number"
                id="amount"
                placeholder="Введите количество"
                value={quantity}
                onChange={handleQuantityChange}
                ref={quantityInputRef} // Добавляем ref
              />

              {quantityError && (
                <p style={{ color: "red", fontSize: "18px" }}>
                  {quantityError}
                </p>
              )}
            </div>

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

        {/* Блок вывода рекомендаций по уходу */}
        <div className={styles.description}>
          <h2>Рекомендации по уходу</h2>
          {recommendation ? (
            <p className={styles.phar}>{recommendation}</p>
          ) : (
            <p>Рекомендаций пока нет</p>
          )}
        </div>

        <div className={styles.results}>
          <h2>Цена: {totalPrice.toFixed(2)}</h2>
          <div onClick={handleOrder}>
            <ButtonLight>Оформить заказ</ButtonLight>
          </div>
        </div>
      </div>
    </section>
  );
};
