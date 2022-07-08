import React from "react";
import styles from "./Filter.module.css";

type Props = {};

function Filter({}: Props) {
  return (
    <div className={styles.FContainer}>
      <div className={styles.FContainerInner}>Filter</div>
    </div>
  );
}

export default Filter;
