import React from "react";
import Filter from "./Filter";
import styles from "./FilterContainer.module.css";

type Props = {};

function FiltersContainer({}: Props) {
  const filterArray = [
    "All",
    "Credit",
    "Debit",
    "Pending",
    "Completed",
    "Canceled",
    "USD",
    "NGN",
  ];
  return (
    <div className={styles.FCContainer}>
      {filterArray.map((type, i) => (
        <Filter key={i} type={type} />
      ))}
    </div>
  );
}

export default FiltersContainer;
