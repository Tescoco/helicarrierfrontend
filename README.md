1. Fetching transactions
2. Sorting each transactions by date
3. Search Container
4. Filters

5. Fetching transactions

   - We use our Appllo Client to make a request to our mock GraphQl Api,

   - We store the transactions with set state

   - After we sort 'this' transactions and we group transactions having the same dates together, then we store with set state which in turn is mapped and lists of transactions is displayed

   - The task doesn't mention if the transactions are retured in an orderly fashion

   eg. 7-11-2022 -> 7-12-2022 -> 7-13-2022 -> 7-14-2022

   or are scattered

   eg. 7-13-202 -> 7-11-2022 -> 7-14-2022 -> 7-12-2022

   So we assume there are return from the api in an orderly fashion.

6. Sorting each transactions by date
