import React, { useState, useEffect } from "react";

import styles from "./Convert.module.scss";
import { currencyRegex } from "./validation";

import { Button, Input } from "../../components";
import { getCurrencyConvert } from "../../services";

type TConfig = { amount: number; currencies: (string | number)[] };

export const Convert: React.FC = () => {
  const [inputValue, setInputValue] = useState<string[]>([""]);
  const [convertConfig, setConvertConfig] = useState<TConfig>({
    amount: 0,
    currencies: [],
  });
  const [result, setResult] = useState<{
    info: {
      rate: number;
    };
    query: { amount: number; from: string; to: string };
    result: number;
  }>();

  useEffect(() => {
    const config: TConfig = {
      amount: 0,
      currencies: [],
    };

    inputValue.map((t: string) => {
      if (+t > 0) {
        config.amount = +t;
      }
      if (isNaN(+t)) {
        config.currencies.push(t.toUpperCase());
      }
    });

    setConvertConfig(config);
  }, [inputValue]);

  const handleConvert = () => {
    getCurrencyConvert(convertConfig).then((res) => setResult(res));
  };

  return (
    <div className={styles.wrapper}>
      <Input
        setInputValue={setInputValue}
        validationSchema={currencyRegex}
        placeholder={"15 usd in uah"}
      />
      <Button title="convert" onClick={handleConvert} />
      {result && (
        <div className={styles.result}>
          <p className={styles.text}>
            {convertConfig.amount}{" "}
            <span className={styles.highlight}>
              {convertConfig.currencies[0]}
            </span>{" "}
            equals {result?.result}{" "}
            <span className={styles.highlight}>
              {convertConfig.currencies[1]}
            </span>
          </p>
          <p>
            Rate: <span className={styles.highlight}>{result?.info.rate}</span>
          </p>
        </div>
      )}
    </div>
  );
};
