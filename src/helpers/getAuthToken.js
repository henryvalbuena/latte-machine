const getAuthToken = () => {
  let url = window.location.href;
  let token = url.split("access_token=")[1];
  if (token) {
    let endIndex = token.indexOf("&");
    token = token.slice(0, endIndex);
    return token;
  }
};

export default getAuthToken;
