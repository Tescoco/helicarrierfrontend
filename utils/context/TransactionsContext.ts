import { createContext } from "react";
import { SortedTransactions, Transactions } from "../../pages";

interface defaultValue {
  filterArray: (value: string) => void;
  transactions: Transactions[];
  setSortedTransactions: (value: SortedTransactions) => void;
}

const defaultValue: defaultValue = {
  filterArray: () => {},
  transactions: [],
  setSortedTransactions: () => {},
};

export const TransactionsContext = createContext(defaultValue);
