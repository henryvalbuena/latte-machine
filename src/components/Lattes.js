import React from "react";

import styles from "./Lattes.module.css";

function Lattes({latteList}) {
  return (
    <div className={styles.lattesContainer}>
      {latteList}
    </div>
  );
}

export default Lattes;
