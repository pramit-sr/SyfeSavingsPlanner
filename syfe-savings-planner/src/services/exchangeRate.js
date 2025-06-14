import axios from 'axios';

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
console.log("Loaded API Key:", import.meta.env.VITE_EXCHANGE_API_KEY);

export const fetchExchangeRate = async () => {
  try {
    const res = await axios.get(API_URL);

    console.log("API Response:", res.data);

    if (res.data.result !== "success") {
      throw new Error("API call unsuccessful");
    }

    return {
      rate: res.data.conversion_rates.INR,
      time: new Date().toISOString(), 
    };
  } catch (err) {
    console.error("Exchange rate fetch error:", err.message);
    throw new Error("Failed to fetch exchange rate.");
  }
};
