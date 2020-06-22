import React from "react";

import Latte from "./Latte";

import styles from "./Lattes.module.css";

function Lattes({ latteList, edit }) {
  let mapLattes = latteList.map((l) => {
    return (
      <Latte
        key={l.id}
        name={l.title}
        ingredients= {l.ingredients}
        edit={() => edit(l.id)}
      />
    );
  });
  return <div className={styles.lattesContainer}>{mapLattes}</div>;
}

export default Lattes;
