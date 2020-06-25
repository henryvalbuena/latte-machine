import React from "react";

import LatteIngredients from "./LatteIngredients";

import styles from "./Latte.module.css";

function Latte({ingredients, title, edit}) {
  return (
      <div className={styles.latteBox} onClick={edit}>
        <div className={styles.latteName}>{title}</div>
        <LatteIngredients ingredients={ingredients} />
      </div>
  );
}

export default Latte;
