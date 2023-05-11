import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { theme, ResetStyle } from '@styles';
import { Router } from '@navigation';
import { Splash } from '@screens';
import { store, persistor } from '@store';
import { ModalProvider } from '@providers';

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 1250);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ModalProvider>
            <ResetStyle />
            <Splash isSplashVisible={isSplashVisible} />
            <Router />
          </ModalProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};
export default App;
