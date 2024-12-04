import axios from "axios";

const API_BASE_URL = "http://localhost:8004/api/v1/analisis";

export const fetchAnalisis = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

export const deleteAnalisis = async (id, token) => {
  await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateAnalisis = async (analisis, token) => {
  await axios.put(
    `${API_BASE_URL}/update/${analisis.id}`,
    analisis,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
export const createAnalisis = async (analisis, token) => {
  await axios.post(`${API_BASE_URL}/create`, analisis, {
    headers: { Authorization: `Bearer ${token}` },
  });
};