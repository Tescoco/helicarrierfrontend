import React from "react";
import Filter from "./Filter";
import styles from "./FilterContainer.module.css";

type Props = {};

function FiltersContainer({}: Props) {
  return (
    <div className={styles.FCContainer}>
      <Filter />
      <Filter />
      <Filter />
      <Filter />
      <Filter />
      <Filter />
    </div>
  );
}

export default FiltersContainer;
