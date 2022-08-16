import { useUserContext } from '@/UserContext';
import React from 'react';

export const MetamaskConnect = () => {
  const [{ connectedAccount, isConnected }, connect] = useUserContext();

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
    return (
      <div className="bg-green-200">
        <p>Connected as {JSON.stringify(connectedAccount)}</p>
      </div>
    );
  }
};
