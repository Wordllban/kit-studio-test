import React from "react";

import styles from "./Input.module.scss";

interface InputProps {
  setInputValue: React.Dispatch<React.SetStateAction<string[]>>;
  validationSchema?: RegExp;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  setInputValue,
  validationSchema,
  placeholder,
}) => {
  const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validation = validationSchema?.exec(event.target.value);
    if (validation) {
      setInputValue(
        event.target.value
          .replaceAll(/\s/g, "")
          .replace(/[in|to]/g, "")
          .replaceAll(/([aA-zZ]{3})/g, " $1 ")
          .split(" "),
      );
    }
  };

  return (
    <input
      type="text"
      className={styles.input}
      onChange={handleValidation}
      placeholder={placeholder}
    />
  );
};
