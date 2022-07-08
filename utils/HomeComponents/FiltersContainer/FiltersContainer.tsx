import React from "react";
import Filter from "./Filter";
import styles from "./FilterContainer.module.css";

type Props = {};

function FiltersContainer({}: Props) {
  return (
    <div className={styles.FCContainer}>
      <Filter type={"credit"} />
      <Filter type={"debit"} />
      <Filter type={"completed"} />
      <Filter type={"pending"} />
      <Filter type={"canceled"} />
      <Filter type={"USD"} />
      <Filter type={"NGN"} />
    </div>
  );
}

export default FiltersContainer;
