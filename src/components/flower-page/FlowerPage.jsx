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
  const [selectedPackage, setSelectedPackage] = useState("");
  const [typeName, setTypeName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [quantityError, setQuantityError] = useState("");
  const [orderError, setOrderError] = useState("");

  const quantityInputRef = useRef(null);

  useEffect(() => {
    if (quantityInputRef.current) {
      const handleWheel = (event) => {
        if (document.activeElement === quantityInputRef.current) {
          event.preventDefault();
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
    Promise.all([fetch(`/api/flower/${id}`), fetch(`/api/package`)])
      .then(async ([resFlower, resPackages]) => {
        if (!resFlower.ok || !resPackages.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const flower = await resFlower.json();
        const packages = await resPackages.json();
        return { flower, packages };
      })
      .then(({ flower, packages }) => {
        setFlower(flower);
        setPackages(packages);
        setTypeName(flower.flower_type.name);
        setRecommendation(flower.flower_type.recommendation.description);
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, [id]);

  useEffect(() => {
    if (packages.length > 0 && !selectedPackage) {
      setSelectedPackage(packages[0].id);
    }
  }, [packages, selectedPackage]);

  if (!flower) {
    return <Loader />;
  }

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
    } else if (flower && numericValue > flower.stock_count) {
      setQuantity(numericValue);
      setQuantityError(`На складе имеется всего ${flower.stock_count} цветов`);
    } else {
      setQuantity(numericValue);
      setQuantityError("");
    }
  };

  const selectedPkg = packages?.find(
    (pkg) => String(pkg.id) === String(selectedPackage)
  );

  const flowerCost = Number(flower?.cost) || 0;
  const packagingCost = selectedPkg ? Number(selectedPkg.cost) || 0 : 0;
  const validQuantity = quantity >= 1 ? quantity : 0;
  const totalPrice =
    flowerCost * validQuantity + (selectedPackage ? packagingCost : 0);

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
        const newStock = flower.stock_count - quantity;
        return fetch(`/api/flower/${flower.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stock_count: newStock }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Ошибка при обновлении остатка: " + res.status);
            }
            return res.json();
          })
          .then(() => {
            console.log("Букет создан:", data);
            navigate("/order", { state: { posyId: data.id } });
          });
      })
      .catch((error) => {
        console.error("Ошибка при оформлении букета:", error);
        setOrderError(error.message);
      });
  };

  if (!flower) {
    return <Loader />;
  }

  return (
    <section>
      {flower && (
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
                  ref={quantityInputRef}
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
      )}
    </section>
  );
};
