import React from "react";

import styles from "./LatteIngredients.module.css";

function LatteIngredients({ingredients}) {
  const ingredientHeight = 10;
  const layers = ingredients.map(({ id, color, parts }) => {
    let style = { backgroundColor: color, height: `${ingredientHeight * parts}px` };
    return <div key={id} style={style}></div>;
  });
  return <div className={styles.ingredients}>{layers}</div>;
}

export default LatteIngredients;
