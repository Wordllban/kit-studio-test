import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../redux";
import { TCurrencyList } from "../../types";

interface IStart {
  isStarted: boolean;
  currentCurrency: string;
  currencyList: TCurrencyList;
}

const initialState: IStart = {
  isStarted: false,
  currentCurrency: "UAH",
  currencyList: { success: false, symbols: {} },
};

const startSlice = createSlice({
  name: "start",
  initialState,
  reducers: {
    setCurrentCurrency: (state, action: PayloadAction<string>) => {
      state.currentCurrency = action.payload;
      return state;
    },
    setCurrencyList: (state, action: PayloadAction<TCurrencyList>) => {
      state.currencyList = action.payload;
      return state;
    },
  },
});

export const getCurrentCurrency = (state: RootState) =>
  state.start.currentCurrency;
export const getCurrencyList = (state: RootState) => state.start.currencyList;
export const { setCurrentCurrency, setCurrencyList } = startSlice.actions;
export default startSlice.reducer;
