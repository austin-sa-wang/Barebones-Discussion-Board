import { createContext, useCallback, useState } from 'react';

import { ethers } from 'ethers';
import { isEmpty, isNil } from 'ramda';
import { useContext } from 'react';

type Props = {
  children?: React.ReactNode;
};

export const UserContext = createContext<IUserContext>({
  connectedAccount: undefined,
  connect: () => {
    console.log(`stub`);
  },
});

export const UserContextProvider = ({ children }: Props) => {
  const [account, setAccount] = useState();

  const _dangerouslySetAccount = (account: string) => {
    setAccount(account);
    localStorage.setItem(`token`, account);
  };

  const connect = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send(`eth_requestAccounts`, []);
    _dangerouslySetAccount(accounts[0]);
  }, []);

  const userContextInstance = {
    connectedAccount: account,
    connect,
  };

  return (
    <UserContext.Provider value={userContextInstance}>
      {children}
    </UserContext.Provider>
  );
};

type useUserContextResult = [
  state: {
    isConnected: boolean;
    connectedAccount: string | undefined;
  },
  connect: () => void,
];

export interface IUserContext {
  connectedAccount: string | undefined;
  connect: () => void;
}

export const useUserContext = (): useUserContextResult => {
  const userContext = useContext(UserContext);

  const state = {
    isConnected:
      !isNil(userContext.connectedAccount) &&
      !isEmpty(userContext.connectedAccount),
    connectedAccount: userContext.connectedAccount,
  };

  return [state, userContext.connect];
};
