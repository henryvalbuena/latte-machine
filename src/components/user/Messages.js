import React from "react";

import styles from "./Messages.module.css";

const errorCodeMappings = {
  "400": "Latte not created",
  "401": "Not authorized",
  "404": "Not found",
  "409": "Duplicated latte",
  "500": "Server Error",
  "Network Error": "Server Error"
};

export function Messages({ message, level, close }) {
  return (
    <div className={styles.container}>
      <div className={[styles.textBox, styles[level]].join(" ")}>
        <div className={styles.close} onClick={close()}>
          <i className="material-icons">close</i>
        </div>
        <div className={styles.text}>{errorCodeMappings[message]}</div>
      </div>
    </div>
  );
}

export const MessageLevel = {
  warning: "warning",
  error: "error",
  info: "info",
};
