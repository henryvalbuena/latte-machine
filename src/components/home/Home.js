import React from "react";

import styles from "./Home.module.css";

function Home(props) {
  return (
    <div className={styles.container}>
      <div className={styles.text}>Welcome</div>
      <div className={styles.line}></div>
      <span className={[styles.arrow, "material-icons"].join(" ")}>
        expand_more
      </span>
    </div>
  );
}

export default Home;
