import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./Header.module.scss";

import { getCurrencyList, setCurrencyList } from "../../pages";
import { useAppDispatch, useAppSelector } from "../../redux";
import { getCurrencyCodes } from "../../services";
import { Select } from "../Select";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [activePage, setActivePage] = useState("/");

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const currencyList = useAppSelector(getCurrencyList);

  if (currencyList.symbols) {
    useEffect(() => {
      getCurrencyCodes().then((result) => {
        dispatch(setCurrencyList(result));
      });
    }, []);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.wrapper}>
        <ul className={styles.nav}>
          <li className={activePage == "/convert" ? styles.active : ""}>
            <Link to="/convert" className={styles.link}>
              Convert
            </Link>
          </li>
          <li className={activePage == "/currency-list" ? styles.active : ""}>
            <Link to="/currency-list" className={styles.link}>
              Prices
            </Link>
          </li>
          <li>
            <Select items={currencyList.symbols} />
          </li>
        </ul>
      </nav>
    </header>
  );
};
