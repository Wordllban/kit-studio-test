import React, { useRef, useState, useEffect } from "react";

import styles from "./Select.module.scss";

import { getCurrentCurrency, setCurrentCurrency } from "../../pages";
import { useAppDispatch, useAppSelector } from "../../redux";
import { assertIsNode } from "../../utils";

interface SelectProps {
  items: Record<string, string>;
}

export const Select: React.FC<Readonly<SelectProps>> = ({ items }) => {
  const dispatch = useAppDispatch();
  const currentCurrency = useAppSelector(getCurrentCurrency);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<string[]>(Object.keys(items));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<Record<string, string>>({
    currencyCode: currentCurrency,
  });

  const handleSearch = (pattern: string) => {
    setList(
      Object.keys(items).filter((item) => item.includes(pattern.toUpperCase())),
    );
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      assertIsNode(event.target);
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    setList(Object.keys(items));

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    setList(Object.keys(items));
  }, [items]);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <div className={styles.select} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.current}>{current.currencyCode}</span>
      </div>
      {isOpen && (
        <ul className={styles.list}>
          <input
            type="text"
            onChange={(e) => {
              if (e.target.value.length >= 3) {
                handleSearch(e.target.value);
              }
            }}
            className={styles.search}
            placeholder="Search"
          />
          {list.map((item, index) => {
            return (
              <li
                key={`${item + index}`}
                onClick={() => {
                  setCurrent({ currencyCode: item });
                  dispatch(setCurrentCurrency(item));
                  setIsOpen(false);
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
