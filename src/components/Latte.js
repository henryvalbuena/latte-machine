import React from "react";

import LatteIngredients from "./LatteIngredients";

import styles from "./Latte.module.css";

function Latte({ingredients, name}) {
  console.log(ingredients)
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
