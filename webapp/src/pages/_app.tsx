import { AppProps } from 'next/app';
import { api } from '@/utils/api';
import '@/style/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

// export default App;
export default api.withTRPC(App);
