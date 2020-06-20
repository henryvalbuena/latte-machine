import React from "react";

import LatteIngredients from "./LatteIngredients";

import styles from "./Latte.module.css";

function Latte({ingredients, name}) {
  return (
    // <div className={styles.container}>
      <div className={styles.latteBox}>
        <div className={styles.latteName}>{name}</div>
        <LatteIngredients ingredients={ingredients} />
      </div>
    // </div>
  );
}

export default Latte;
