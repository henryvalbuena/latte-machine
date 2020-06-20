import React from "react";

import styles from "./LatteIngredients.module.css";

function LatteIngredients({ingredients}) {
  const maxHeight = 100;
  const partition = ingredients.reduce((a, {parts}) => a + parts, 0);
  
  const layers = ingredients.map(({ id, color, parts }) => {
    let style = { backgroundColor: color, height: `${(parts * maxHeight) / partition}%` };
    return <div key={id} style={style}></div>;
  });
  return <div className={styles.ingredients}>{layers}</div>;
}

export default LatteIngredients;
 