import { useEffect, useState } from "react";
import { FlowerCard } from "../../../flower-card/FlowerCard";
import styles from "./weekly.module.css";
import { Loader } from "../../../loader/Loader";

export const Weekly = () => {
  const [flowers, setFlowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/flower/weekly", {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFlowers(data);
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <section>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </section>
    );
  }
  return (
    <section>
      <div className={styles.content}>
        <h2>Цветы недели</h2>

        <div className={styles.list}>
          {flowers.map((flower) => (
            <FlowerCard key={flower.id} flower={flower} />
          ))}
        </div>
      </div>
    </section>
  );
};
