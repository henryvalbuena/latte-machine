import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Footer.module.css";

function Footer(props) {
  return (
      <div className={styles.footer}>
        <NavLink className={styles.iconA} to="/lattes">
          <i className={[styles.icon, "material-icons"].join(" ")}>
            local_cafe
          </i>
          <div>Lattes</div>
        </NavLink>
        <NavLink className={styles.iconB} to="/user">
          <i className={[styles.icon, "material-icons"].join(" ")}>
            account_box
          </i>
          <div>User</div>
        </NavLink>
      </div>
  );
}

export default Footer;
