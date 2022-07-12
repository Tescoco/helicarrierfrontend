1. Fetching transactions
2. Sorting each transactions by date
3. Search Container
4. Filters

## Fetching transactions

- We use our Appllo Client to make a request to our mock GraphQl Api,

- We store the transactions with set state

- After we sort 'this' transactions and we group transactions having the same dates together, then we store with set state which in turn is mapped and lists of transactions is displayed

- The task doesn't mention if the transactions are retured in an

      * orderly fashion eg. 7-11-2022 -> 7-12-2022 -> 7-13-2022 -> 7-14-2022

      * or are scattered eg. 7-13-202 -> 7-11-2022 -> 7-14-2022 -> 7-12-2022

      * So we assume we return from the api in an orderly fashion.

## Sorting each transaction by date

- We created a function called sortByDate, in this function, we pass an array of transactions as a parameter

- Then we call a reduce() method which executes a reducer function for the array element
  we then have 2 callbacks

       * accumulator

       * transaction

- We use accumulator to group arrays with same date together, using each date as a key
  So each array has a title of a date, stick with me

       * Now in the function, we call accumulator[key], key being date, eg. accumulator[7-12-2022] it either return the array with the title `7-12-2022`, if the date doesn't exit we just use an empty array instead.

       * So with this we can collate transactions with same dates together.

## Search Container
