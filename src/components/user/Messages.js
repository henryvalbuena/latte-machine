import React from "react";

import styles from "./Messages.module.css";
import "./Messages.css";

export function Messages({ message, level, close }) {
  return (
    <div className={styles.container}>
      <div className={[styles.textBox, level].join(" ")}>
        <div className={styles.close} onClick={close()}>
          <i className="material-icons">close</i>
        </div>
        <div className={styles.text}>{message}</div>
      </div>
    </div>
  );
}

export const MessageLevel = {
  warning: "warning",
  error: "error",
  info: "info",
};
