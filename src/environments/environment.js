const development = {
  apiURL: "http://localhost:3333/api",
  auth0: {
    url: "coffe-shop-project", // the auth0 domain prefix
    audience: "drinks", // the audience set for the auth0 app
    clientId: "SuLculVALk6l2oZ7aFFQUuZZ8N6lZUrH", // the client id generated for the auth0 app
    callbackURL: "http://localhost:3000/latte-machine/lattes", // the base url of the running react application.
  },
};

const ghpages = {
  apiURL: "https://shielded-wildwood-23349.herokuapp.com/api",
  auth0: {
    url: "coffe-shop-project", // the auth0 domain prefix
    audience: "drinks", // the audience set for the auth0 app
    clientId: "SuLculVALk6l2oZ7aFFQUuZZ8N6lZUrH", // the client id generated for the auth0 app
    callbackURL: "http://henryis.me/latte-machine", // the base url of the running react application.
  },
}

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const environment = isLocalhost ? development : ghpages;

export default environment;
