const environment = {
  apiURL: "http://localhost:3333/api",
  auth0: {
    url: "coffe-shop-project", // the auth0 domain prefix
    audience: "drinks", // the audience set for the auth0 app
    clientId: "SuLculVALk6l2oZ7aFFQUuZZ8N6lZUrH", // the client id generated for the auth0 app
    callbackURL: "http://localhost:3000/lattes", // the base url of the running react application.
  },
};

export default environment;
