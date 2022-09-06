import axios from "axios";

const http = axios.create({
  baseURL: "https://api.apilayer.com/exchangerates_data",
  headers: { apikey: process.env.REACT_APP_CURRENCY_API_KEY || "YOUR_API_KEY" },
});

export const getCurrencyCodes = async () => {
  return (await http.get("https://api.apilayer.com/exchangerates_data/symbols"))
    .data;
};

export const getCurrencyConvert = async ({
  amount,
  currencies,
}: {
  amount: number;
  currencies: (string | number)[];
}) => {
  return (
    await http.get(
      `https://api.apilayer.com/exchangerates_data/convert?to=${currencies[1]}&from=${currencies[0]}&amount=${amount}`,
    )
  ).data;
};

export const getCurrencyPrice = async (base: string) => {
  return (
    await http.get(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=NZD%2CAUD%2CSGD%2CBND%2CCAD%2CUSD%2CCHF%2CEUR%2CJOD%2CUAH&base=${base}`,
    )
  ).data;
};
