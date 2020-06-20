import React from "react";

import styles from "./Footer.module.css";

function Footer(props) {
  return (
    <div className={styles.footer}>
      <div className={styles.iconA}>
        <i className={[styles.icon, "material-icons"].join(" ")}>local_cafe</i>
        <div>Drinks</div>
      </div>
      <div className={styles.iconB}>
        <i className={[styles.icon, "material-icons"].join(" ")}>account_box</i>
        <div>User</div>
      </div>
    </div>
  );
}

export default Footer;
