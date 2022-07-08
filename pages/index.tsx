import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { TransactionsContext } from "../utils/context/TransactionsContext";
import FiltersContainer from "../utils/HomeComponents/FiltersContainer/FiltersContainer";
import SearchInput from "../utils/HomeComponents/Inputs/SearchInput";
import TransactionsContainer from "../utils/HomeComponents/Transactions/TransactionsContainer";

export interface Transactions {
  id: number;
  status: string;
  date: string;
  amount: string;
  type: string;
  name: string;
  currency: string;
}

type SortedTransactions = [string, Transactions[]][];

const Home: NextPage = () => {
  const data: Transactions[] = [
    {
      id: 1,
      status: "completed",
      date: "09-18-1960",
      amount: "100",
      type: "credit",
      name: "John Doe",
      currency: "NGN",
    },
    {
      id: 2,
      status: "completed",
      date: "08-18-1960",
      amount: "100",
      type: "debit",
      name: "John Doe",
      currency: "NGN",
    },
    {
      id: 3,
      status: "pending",
      date: "08-18-1960",
      amount: "100",
      type: "credit",
      name: "John Doe",
      currency: "NGN",
    },
    {
      id: 4,
      status: "completed",
      date: "08-19-1963",
      amount: "100",
      type: "credit",
      name: "John Doe",
      currency: "NGN",
    },
  ];

  const sortByDate = (data: Transactions[]) => {
    let sort = data.reduce((store, transaction) => {
      let key = transaction.date;

      // store is used to group arrays with same date together
      // if store[key] is undefined (means that the date is not in the array)
      // we use an empty array instead
      // now we assign store[key] to another transaction (with the same date) with the same date using concat
      store[key] = (store[key] || []).concat(transaction);

      return store;
    }, {});

    //turn the sort into an array

    let sortArray = Object.entries(sort).map((k) => k);
    return sortArray;
  };

  useEffect(() => {
    setSortedTransactions(sortByDate(data));
  }, []);

  const [sortedTransactions, setSortedTransactions] =
    useState<SortedTransactions>([]);
  const [filters, setFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  return (
    <TransactionsContext.Provider value={{ e: "transactions" }}>
      <div className={styles.container}>
        <div className={styles.containerInner}>
          <SearchInput />
          <FiltersContainer />
          {sortedTransactions?.map((sortedTransaction, index) => (
            <TransactionsContainer
              date={sortedTransaction[0]}
              transaction={sortedTransaction[1]}
              key={index}
            />
          ))}
        </div>
      </div>
    </TransactionsContext.Provider>
  );
};

export default Home;
