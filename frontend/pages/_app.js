import NProgress from 'nprogress';
import Router from 'next/router';
// import type { AppProps, AppContext } from 'next/app';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { NextPageContext } from 'next';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';
// import { CartStateProvider } from '../context/Cart';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// type ApolloProps = {
//   apollo: ApolloClient<any>;
// };
// type ApolloAppProps = ApolloProps & AppProps;


function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      {/* <CartStateProvider> */}
        <Page>
          <Component {...pageProps} />
        </Page>
      {/* </CartStateProvider> */}
    </ApolloProvider>
  );
}

// this is a next function. if any of the pages have inititial props than just use them. ctx = context
MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // get any query variables available at a page level
  pageProps.query = ctx.query;
  
  return { pageProps }

}
export default withData(MyApp)