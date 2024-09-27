import { AccountInfo } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { AptosClient } from "aptos";
const client = new AptosClient("https://fullnode.testnet.aptoslabs.com/v1");
export const getBalance = async (account: AccountInfo) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resources: any[] = await client.getAccountResources(account.address);
  const accountResource = resources.find(
    (r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
  );

  if (accountResource) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const balanceValue = (accountResource.data as any).coin.value;
    return balanceValue ? parseInt(balanceValue) / 100000000 : 0;
  } else {
    return 0;
  }
};

export const getGame = async (account: AccountInfo) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resources: any[] = await client.getAccountResources(account.address);
  return resources;
};

export const AptosSetup = () => {
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);
  return aptos;
};

export const sender =
  "0x6d0177e989c24a754898079abcda70faca206529a4101072dfa54b91d17727b5";

export const functionName = (name: string) => {
  return `0x6d0177e989c24a754898079abcda70faca206529a4101072dfa54b91d17727b5::RockPaperScissors::${name}` satisfies `${string}::${string}::${string}`;
};
