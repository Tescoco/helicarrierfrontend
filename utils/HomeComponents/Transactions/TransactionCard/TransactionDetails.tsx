import React from "react";
import { Transactions } from "../../../../pages";
import styles from "./TransactionCard.module.css";

type Props = {
  data: Transactions;
};

function TransactionDetails({ data }: Props) {
  return (
    <div className={styles.TDContainer}>
      {data.currencyIcon} {data.amount} {data.type}
      {data.type === "credit" ? " from " : " to "}
      {data.name}
    </div>
  );
}

export default TransactionDetails;
