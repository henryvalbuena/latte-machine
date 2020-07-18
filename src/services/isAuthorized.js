const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const isAuthorized = (token) => {
  const parsedToken = parseJwt(token);
  const currentTime = parseInt(Date.now() / 1000);
  if (currentTime > parsedToken.exp)
    return false;
  if (!parsedToken.permissions.includes("delete:latte"))
    return false;
  if (!parsedToken.permissions.includes("patch:latte"))
    return false;
  if (!parsedToken.permissions.includes("post:latte"))
    return false;
  return true;
}

export default isAuthorized;
