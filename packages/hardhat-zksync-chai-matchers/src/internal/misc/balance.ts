import * as zk from "zksync-web3";

import { Account, getAddressOf } from "./account";

export interface BalanceChangeOptions {
  includeFee?: boolean;
}

export function getAddresses(accounts: Array<Account | string>) {
  return Promise.all(accounts.map((account) => getAddressOf(account)));
}

export async function getBalances(
  accounts: Array<Account | string>,
  blockNumber?: number
) {
  const { BigNumber } = await import("ethers");
  const provider = zk.Provider.getDefaultProvider();

  return Promise.all(
    accounts.map(async (account) => {
      const address = await getAddressOf(account);
      const result = await provider.send("eth_getBalance", [
        address,
        `0x${blockNumber?.toString(16) ?? 0}`,
      ]);
      return BigNumber.from(result);
    })
  );
}