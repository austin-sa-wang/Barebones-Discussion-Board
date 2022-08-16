import { createContext, useCallback, useState } from 'react';

import { ethers } from 'ethers';
import { isEmpty, isNil } from 'ramda';
import { useContext } from 'react';

type Props = {
  children?: React.ReactNode;
};

export const UserContext = createContext<IUserContext>({
  connectedAccounts: undefined,
  connect: () => {
    console.log(`stub`);
  },
});

export const UserContextProvider = ({ children }: Props) => {
  const [accounts, setAccounts] = useState();

  const connect = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send(`eth_requestAccounts`, []);
    setAccounts(accounts);
  }, []);

  const userContextInstance = {
    connectedAccounts: accounts,
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
    connectedAccounts: string[] | undefined;
  },
  connect: () => void,
];

export interface IUserContext {
  connectedAccounts: string[] | undefined;
  connect: () => void;
}

export const useUserContext = (): useUserContextResult => {
  const userContext = useContext(UserContext);

  const state = {
    isConnected:
      !isNil(userContext.connectedAccounts) &&
      !isEmpty(userContext.connectedAccounts),
    connectedAccounts: userContext.connectedAccounts,
  };

  return [state, userContext.connect];
};
