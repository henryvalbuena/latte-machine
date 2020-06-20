import React from "react";

import styles from "./Header.module.css";

function Header(props) {
  return (
    <div className={styles.header}>
      <span className={styles.left}>Latte</span>
      <span className={styles.dash}>-</span>
      <span className={styles.right}>Machine</span>
    </div>
  );
}

export default Header;
