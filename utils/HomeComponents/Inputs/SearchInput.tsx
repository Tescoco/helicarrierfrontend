import React from "react";
import styles from "./SearchInput.module.css";

type Props = {};

function SearchInput({}: Props) {
  return (
    <div className={styles.SIContainer}>
      <div className={styles.SIContainerInner}>
        <input className={styles.SIInput} type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default SearchInput;
