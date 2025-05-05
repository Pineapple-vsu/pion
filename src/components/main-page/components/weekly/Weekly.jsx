import { useEffect, useState } from "react";
import { FlowerCard } from "../../../flower-card/FlowerCard";
import styles from "./weekly.module.css";

export const Weekly = () => {
  const [flowers, setFlowers] = useState([]);

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
      });
  }, []);
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
