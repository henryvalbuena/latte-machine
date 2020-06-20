import React from "react";

import styles from "./CreateLatte.module.css";

function CreateLatte(props) {
  return (
    <div className={styles.container}>
      <div className={styles.createDrink}>
        <div className={styles.text}>Create Drink</div>
        <i className={[styles.icon, "material-icons"].join(" ")}>cancel</i>
      </div>
    </div>
  );
}

export default CreateLatte;
