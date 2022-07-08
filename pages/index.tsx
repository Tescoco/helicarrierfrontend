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
      status: "canceled",
      date: "09-18-1960",
      amount: "100",
      type: "credit",
      name: "John Doe",
      currency: "NGN",
    },
    {
      id: 2,
      status: "pending",
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
    let sort = data.reduce((accumulator, transaction) => {
      let key = transaction.date;

      // accumulator is used to group arrays with same date together
      // if accumulator[key] is undefined (means that the date is not in the array)
      // we use an empty array instead
      // now we assign accumulator[key] to bundle a transaction (with the same date) using concat
      accumulator[key] = (accumulator[key] || []).concat(transaction);

      return accumulator;
    }, {});

    //turn the sort into an array
    let sortArray = Object.entries(sort).map((k) => k);
    return sortArray;
  };

  const [sortedTransactions, setSortedTransactions] =
    useState<SortedTransactions>(sortByDate(data));
  const [filters, setFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const filterByType = (type: string) => {
    let filteredTransactions = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === type) {
        filteredTransactions.push(data[i]);
      }
    }
    return sortByDate(filteredTransactions);
  };

  const filterByStatus = (status: string) => {
    let filteredTransactions = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === status) {
        filteredTransactions.push(data[i]);
      }
    }
    return sortByDate(filteredTransactions);
  };

  const filterByCurrency = (currency: string) => {
    let filteredTransactions = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].currency === currency) {
        filteredTransactions.push(data[i]);
      }
    }
    return sortByDate(filteredTransactions);
  };

  const filterArray = (filter: string) => {
    switch (filter) {
      case "credit":
      case "debit":
        setSortedTransactions(filterByType(filter));
        break;
      case "completed":
      case "pending":
      case "canceled":
        setSortedTransactions(filterByStatus(filter));
        break;
      case "USD":
      case "NGN":
        setSortedTransactions(filterByCurrency(filter));
        break;
    }
  };

  return (
    <TransactionsContext.Provider value={{ filterArray }}>
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
