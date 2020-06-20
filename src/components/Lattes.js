import React from "react";

import styles from "./Lattes.module.css";

function Lattes(props) {
  return (
    <div className={styles.lattesContainer}>
      {props.latteList}
    </div>
  );
}

export default Lattes;
