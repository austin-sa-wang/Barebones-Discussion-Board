import { useUserContext } from '@/UserContect';
import React from 'react';

export const MetamaskConnect = () => {
  const [{ connectedAccounts, isConnected }, connect] = useUserContext();

  if (!isConnected) {
    return (
      <button
        className="mt-4 cursor-pointer p-6 font-semibold text-md bg-cyan-500 hover:bg-sky-700 text-white rounded-full shadow-sm w-fit"
        onClick={() => connect()}
      >
        Connect to Metamask
      </button>
    );
  } else {
    return <p>Connected as {JSON.stringify(connectedAccounts)}</p>;
  }
};
