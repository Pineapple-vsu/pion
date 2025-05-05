import styles from "./catalog-page.module.css";
import { useEffect, useState } from "react";
import { ButtonDark } from "../buttons";
import { FlowerCard } from "../flower-card/FlowerCard";

export const CatalogPage = () => {
  const [flowers, setFlowers] = useState([]);
  const [allFlowers, setAllFlowers] = useState([]);

  const [typeFilter, setTypeFilter] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [weeklyFilter, setWeeklyFilter] = useState(false);

  const resetFilters = () => {
    setTypeFilter("");
    setQuantityFilter("");
    setNameFilter("");
    setWeeklyFilter(false);
    setFlowers(allFlowers);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    console.log("Запрос на сервер с фильтрами:", {
      typeFilter,
      quantityFilter,
      nameFilter,
      weeklyFilter,
    });

    let urls = [];

    if (nameFilter) {
      urls.push(`/api/flower/search/${nameFilter}`);
    }
    if (typeFilter) {
      urls.push(`/api/flower/type_name/${typeFilter}`);
    }
    if (quantityFilter) {
      urls.push(`/api/flower/stock/${quantityFilter}`);
    }
    if (weeklyFilter) {
      urls.push(`/api/flower/weekly`);
    }

    try {
      let filteredFlowers = allFlowers;

      for (let url of urls) {
        const res = await fetch(url);
        const data = await res.json();
        filteredFlowers = filteredFlowers.filter((flower) =>
          data.some((filteredFlower) => filteredFlower.id === flower.id)
        );
      }

      setFlowers(filteredFlowers);
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  //одна сортировка
  // const handleSearch = async (e) => {
  //   e.preventDefault();

  //   console.log("Запрос на сервер с фильтром:", {
  //     typeFilter,
  //     quantityFilter,
  //     nameFilter,
  //     weeklyFilter,
  //   });

  //   let url = "/api/flower"; // Базовый маршрут

  //   if (nameFilter) {
  //     url = `/api/flower/search/${nameFilter}`;
  //   } else if (typeFilter) {
  //     url = `/api/flower/type/${typeFilter}`;
  //   } else if (quantityFilter) {
  //     url = `/api/flower/stock/${quantityFilter}`;
  //   } else if (weeklyFilter) {
  //     url = `/api/flower/weekly`;
  //   }

  //   try {
  //     const res = await fetch(url);
  //     const filteredFlowers = await res.json();

  //     console.log("Полученные данные от сервера:", filteredFlowers);
  //     setFlowers(filteredFlowers);
  //   } catch (error) {
  //     console.error("Ошибка запроса:", error);
  //   }
  // };

  //без сортировки
  // useEffect(() => {
  //   fetch("/api/flower", {
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setFlowers(data);
  //     });
  // }, []);

  useEffect(() => {
    fetch("/api/flower")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllFlowers(data);
        setFlowers(data);
      });
  }, []);

  return (
    <section>
      <div className={styles.catalog}>
        <h2>Каталог</h2>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.row}>
              <h3>Тип цветов:</h3>
              <input
                type="text"
                placeholder="пион"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              />
            </div>
            <div className={styles.row}>
              <h3>Количество на складе:</h3>
              <input
                type="number"
                placeholder="20"
                value={quantityFilter}
                onChange={(e) => setQuantityFilter(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              />
            </div>
            <h3>Название:</h3>
            <input
              type="text"
              placeholder="Ред гранд"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            />
            <input
              type="checkbox"
              id="weekly"
              checked={weeklyFilter}
              onChange={(e) => setWeeklyFilter(e.target.checked)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            />
            <label htmlFor="weekly">Цветок недели</label>
            <button type="submit" onClick={handleSearch}>
              <ButtonDark className={styles.button_dark}>Искать</ButtonDark>
            </button>
            <button onClick={resetFilters}>
              <ButtonDark className={styles.button_dark}>Сбросить</ButtonDark>
            </button>
          </div>

          <div className={styles.right}>
            {flowers.map((flower) => (
              <FlowerCard
                key={flower.id}
                flower={flower}
                {...console.log(flower)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
