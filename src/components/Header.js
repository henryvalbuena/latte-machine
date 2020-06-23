import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

function Header(props) {
  return (
    <div className={styles.header}>
      <NavLink className={styles.home} to="/latte-machine">
        <span className={styles.left}>Latte</span>
        <span className={styles.dash}>-</span>
        <span className={styles.right}>Machine</span>
      </NavLink>
    </div>
  );
}

export default Header;
