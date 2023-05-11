import { useEffect, useState } from 'react';

const useNetwork = () => {
  const [networkOnlineState, setNetworkOnlineState] = useState(
    window.navigator.onLine
  );

  const updateNetworkState = () => {
    setNetworkOnlineState(window.navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('offline', updateNetworkState);
    window.addEventListener('online', updateNetworkState);

    return () => {
      window.removeEventListener('offline', updateNetworkState);
      window.removeEventListener('online', updateNetworkState);
    };
  });

  return networkOnlineState;
};

export default useNetwork;
