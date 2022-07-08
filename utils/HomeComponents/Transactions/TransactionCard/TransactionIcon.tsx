import React from "react";
import styles from "./TransactionCard.module.css";
import { AiOutlineRise } from "react-icons/ai";

type Props = {};

function TransactionIcon({}: Props) {
  return (
    <div className={styles.TIContainer}>
      <AiOutlineRise size={22} color="green" />
    </div>
  );
}

export default TransactionIcon;
