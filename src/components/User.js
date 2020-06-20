import React from "react";

import styles from "./User.module.css";

function User(props) {
  return (
    <div className={styles.container}>
      <div className={styles.userBox}>
        <button className={styles.login}>LOG IN</button>
        {/* <div className={styles.text}>Welcome user</div> */}
      </div>
    </div>
  );
}

export default User;
