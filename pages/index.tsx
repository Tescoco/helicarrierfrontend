import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import FiltersContainer from "../utils/HomeComponents/FiltersContainer/FiltersContainer";
import SearchInput from "../utils/HomeComponents/Inputs/SearchInput";
import TransactionCard from "../utils/HomeComponents/Transactions/TransactionCard/TransactionCard";
import TransactionsContainer from "../utils/HomeComponents/Transactions/TransactionsContainer";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <SearchInput />
        <FiltersContainer />
        <TransactionsContainer />
        <TransactionsContainer />
        <TransactionsContainer />
      </div>
    </div>
  );
};

export default Home;
