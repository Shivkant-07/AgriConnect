import axios from "axios";

const API_KEY = "579b464db66ec23bdd0000017b2e92feb2f6431d7a8b3668026c5dbe";

export const getMandiPrices = async (commodity = "") => {

  let url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=20`;

  if (commodity.trim() !== "") {
    url += `&filters[commodity]=${commodity}`;
  }

  const response = await axios.get(url);

  return response.data.records;
};