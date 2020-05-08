import React, { useState, useContext, useEffect } from "react";
import Routes from "./Routes";
import { ClientContext } from "graphql-hooks";
import { setAccessToken } from "./acessToken";

function App() {
  const client = useContext(ClientContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4001/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const { accessToken } = await res.json();
      if (accessToken) {
        setAccessToken(accessToken, client);
      }
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <div>loading</div>;
  }

  return <Routes />;
}

export default App;
