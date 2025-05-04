import { useEffect, useState } from "react";
import { Flower } from "../../../flower/Flower";
import styles from "./weekly.module.css";
import { Link } from "react-router";

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
            <Flower key={flower.id} flower={flower} />
          ))}
        </div>
      </div>
    </section>
  );
};
