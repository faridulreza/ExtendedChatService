import React from "react";
import styles from "./modal.module.css";
const Modal = ({ children }) => {
  return (
    <React.Fragment>
      <div className={styles.modal}>
        <div>{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
