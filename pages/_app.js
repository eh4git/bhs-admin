import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [apolloClient, setApolloClient] = useState(null);
  useApollo(pageProps.initialApolloState).then(client => {
    // console.log("CLIENT!!!", client);
    setApolloClient(client);
  });
  if (!apolloClient) return <h1>Loading...</h1>;
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
