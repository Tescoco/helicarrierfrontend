import { createContext } from "react";
import { SortedTransactions, Transactions } from "../../pages";

interface defaultValue {
  filterArray: (value: string) => void;
  data: Transactions[];
  setSortedTransactions: (value: SortedTransactions) => void;
  sortByDate: (value: Transactions[]) => any;
}

const defaultValue: defaultValue = {
  filterArray: () => {},
  data: [],
  setSortedTransactions: () => {},
  sortByDate: () => {},
};

export const TransactionsContext = createContext(defaultValue);
