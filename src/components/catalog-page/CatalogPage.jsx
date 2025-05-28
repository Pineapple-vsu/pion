import styles from "./catalog-page.module.css";
import { useEffect, useState } from "react";
import { ButtonDark } from "../buttons";
import { FlowerCard } from "../flower-card/FlowerCard";
import { Loader } from "../loader/Loader";

export const CatalogPage = () => {
  const [flowers, setFlowers] = useState([]);
  const [allFlowers, setAllFlowers] = useState([]);

  const [typeFilter, setTypeFilter] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [weeklyFilter, setWeeklyFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const resetFilters = () => {
    setTypeFilter("");
    setQuantityFilter("");
    setNameFilter("");
    setWeeklyFilter(false);
    setFlowers(allFlowers);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/flower")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllFlowers(data);
        setFlowers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки:", error);
      });
  }, []);
  if (isLoading) {
    return (
      <section>
        <Loader></Loader>
      </section>
    );
  }

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
