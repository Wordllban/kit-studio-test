import React, { useState, useEffect } from "react";

import styles from "./Table.module.scss";

import { getCurrentCurrency } from "../../pages";
import { useAppSelector } from "../../redux";
import { getCurrencyPrice } from "../../services";

export const Table: React.FC = () => {
  const [result, setResult] = useState<{ rates: { [key: string]: number } }>({
    rates: {},
  });
  const currentCurrency = useAppSelector(getCurrentCurrency);

  useEffect(() => {
    getCurrencyPrice(currentCurrency).then((res) => setResult(res));
  }, [currentCurrency]);

  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr>
          <th>Currency</th>
          <th>Price in {currentCurrency}</th>
        </tr>
        {Object.entries(result.rates).map((item) => {
          return (
            <tr className={styles.row} key={item[0] + item[1]}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
