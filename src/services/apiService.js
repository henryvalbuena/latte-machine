import axios from "axios";
import environment from "../environments/environment";

const apiURL = environment.apiURL;

const axiosManager = async (method, token, endpoint, payload = null) => {
  const res = await axios({
    method: method,
    baseURL: apiURL,
    url: endpoint,
    data: payload ? payload : null,
    responseType: "json",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postLattes = async (payload, token) => {
  return axiosManager("post", token, "/latte", payload);
};

export const getLattes = async (token) => {
  return axiosManager("get", token, "/latte");
};

export const editLattes = async (id, payload, token) => {
  return axiosManager("patch", token, `/latte/${id}`, payload);
};

export const deleteLattes = async (id, token) => {
  return axiosManager("delete", token, `/latte/${id}`);
};
