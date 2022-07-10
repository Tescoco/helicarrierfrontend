import React from "react";
import styles from "./TransactionCard.module.css";
import { AiOutlineRise } from "react-icons/ai";
import { FiTrendingDown } from "react-icons/fi";

type Props = {
  type: string;
};

function TransactionIcon({ type }: Props) {
  return (
    <div className={styles.TIContainer}>
      {type === "credit" ? (
        <AiOutlineRise size={22} color="green" />
      ) : (
        <FiTrendingDown size={22} color="red" />
      )}
    </div>
  );
}

export default TransactionIcon;
