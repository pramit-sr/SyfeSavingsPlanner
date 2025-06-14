import axios from 'axios';

const API_KEY = "a28bb1d2781ed9757950c657";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

export const fetchExchangeRate = async () => {
  try {
    const res = await axios.get(API_URL);

    console.log("API Response:", res.data);

    if (res.data.result !== "success") {
      throw new Error("API call unsuccessful");
    }

    return {
      rate: res.data.conversion_rates.INR,
      time: new Date().toLocaleString(), 
    };
  } catch (err) {
    console.error("Exchange rate fetch error:", err.message);
    throw new Error("Failed to fetch exchange rate.");
  }
};
