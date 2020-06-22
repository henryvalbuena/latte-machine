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
  return axiosManager("post", token, "/drinks", payload);
};

export const getLattes = async (token) => {
  return axiosManager("get", token, "/drinks");
};

export const editLattes = async (id, payload, token) => {
  return axiosManager("patch", token, `/drinks/${id}`, payload);
};

export const deleteLattes = async (id, token) => {
  return axiosManager("delete", token, `/drinks/${id}`);
};
