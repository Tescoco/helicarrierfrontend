import React, { useContext } from "react";
import { TransactionsContext } from "../../context/TransactionsContext";
import styles from "./Filter.module.css";

type Props = {
  type: string;
};

function Filter({ type }: Props) {
  // consuming context Api
  const { filterArray } = useContext(TransactionsContext);

  return (
    <div className={styles.FContainer}>
      <div
        onClick={() => filterArray(type.toLocaleLowerCase())}
        className={styles.FContainerInner}
      >
        {type}
      </div>
    </div>
  );
}

export default Filter;
