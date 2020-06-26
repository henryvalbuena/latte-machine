import React from "react";

import environment from "../../environments/environment";

import styles from "./User.module.css";

const auth0 = environment.auth0;

function User({ token, hangleLogout }) {
  let buildURL =
    `https://${auth0.url}.auth0.com/authorize?audience=${auth0.audience}` +
    `&response_type=token&client_id=${auth0.clientId}&redirect_uri=${auth0.callbackURL}`;

  let renderToken = () => {
    if (token)
      return (
        <div className={styles.userBox}>
          <button onClick={hangleLogout()} className={styles.login}>
            LOG OUT
          </button>
          <div className={styles.textBox}>
            <span className={styles.text}>{token}</span>
          </div>
        </div>
      );
    else
      return (
        <div className={styles.userBox}>
          <a href={buildURL} className={styles.login}>
            LOG IN
          </a>
        </div>
      );
  };

  return <div className={styles.container}>{renderToken()}</div>;
}

export default User;
