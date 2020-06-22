import axios from "axios";
import environment from "../environments/environment";

const apiURL = environment.apiURL;

const axiosManager = async (method, token, endpoint, payload = null) => {
  const parsedPayload = {
    title: payload?.name,
    recipe: payload?.ingredients,
  };
  const res = await axios({
    method: method,
    baseURL: apiURL,
    url: endpoint,
    data: payload ? parsedPayload : null,
    responseType: "json",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postLattes = async (payload, token) => {
  console.log("POSTING", payload);
  return axiosManager("post", token, "/drinks", payload);
};

export const getLattes = async (token) => {
  return axiosManager("get", token, "/drinks");
};
