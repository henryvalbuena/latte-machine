import React from "react";

import styles from "./Messages.module.css";
import "./Messages.css";

export function Messages({ message, level }) {
  console.log(message, level)
  return (
    <div className={styles.container}>
      <div className={[styles.text, level].join(" ")}>{message}</div>
    </div>
  );
}

export const MessageLevel = {
  warning: "warning",
  error: "error",
  info: "info",
};
