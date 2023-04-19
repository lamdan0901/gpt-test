import '@styles/global.css';
import '@i18n';

import CI from '@utils/connectionInstance';
// import { store } from '@redux/store';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { createContext } from 'react';
// import { Provider } from 'react-redux';

export const DataContext = createContext<CategoryResponse>({
  total: 0,
  categories: [],
});

interface MyAppProps extends AppProps {
  categories: CategoryResponse;
}

const MyApp = ({ Component, pageProps, categories }: MyAppProps) => (
  // <Provider store={store}>
  <DataContext.Provider value={categories}>
    <Component {...pageProps} />
  </DataContext.Provider>
  // </Provider>
);

MyApp.getInitialProps = async (appContext: AppContext) => {
  const categories = await CI.get<any, CategoryResponse>(
    '/categories?offset=0&take=100'
  );

  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, categories };
};

export default MyApp;
