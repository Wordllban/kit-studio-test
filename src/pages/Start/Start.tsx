import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Start.module.scss";
import { getCurrencyList, setCurrencyList } from "./start.slice";

import { Button, Select } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux";
import { getCurrencyCodes } from "../../services";

interface StartProps {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Start: React.FC<StartProps> = ({ setIsStarted }) => {
  const dispatch = useAppDispatch();
  const currencyList = useAppSelector(getCurrencyList);
  useEffect(() => {
    getCurrencyCodes().then((result) => {
      dispatch(setCurrencyList(result));
    });
  }, []);

  const handleStart = () => {
    setIsStarted(true);
  };
  return (
    <div className={styles.wrapper}>
      <h1>Welcome to currency convertor!</h1>
      <div className={styles.starter}>
        <Select items={currencyList.symbols} />
        <Link to="/convert">
          <Button title={"Start"} onClick={handleStart} />
        </Link>
      </div>
    </div>
  );
};
