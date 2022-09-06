import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./App.module.scss";
import { Header } from "./components";
import { Convert, CurrencyList, Start } from "./pages";

function App() {
  const [isStarted, setIsStarted] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <div className={styles.container}>
        {isStarted && <Header />}
        <div className={styles.wrapper}>
          <Routes>
            <Route path="/" element={<Start setIsStarted={setIsStarted} />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/currency-list" element={<CurrencyList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
