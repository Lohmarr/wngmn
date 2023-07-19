import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// We import our Welcome component from our components folder so that we can eventually return it.

import "./componentStyles/index.css";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import BirdProfile from "./pages/BirdProfile";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Inside our App component, we have a return method that contains all the JSX we want to render to the screen.

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path={`/account/:id`} element={<UserProfile />} />
          <Route path="/bird/:id" element={<BirdProfile />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
