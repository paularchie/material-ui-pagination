import React from "react";
import { useCountries } from "./common/graphql/hooks/useCountries";
import CountryList from "./components/CountryList/CountryList";
import "./styles.scss";

function App() {
  const { data, loading, error } = useCountries();

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  return (
    <div className="app-container">
      <h1>Country List</h1>
      <CountryList countries={data?.countries} />
    </div>
  );
}

export default App;
