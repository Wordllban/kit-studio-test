import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {title.toUpperCase()}
    </button>
  );
};
