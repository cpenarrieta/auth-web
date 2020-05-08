import React from "react";
import { useQuery } from "graphql-hooks";

const ME_QUERY = `
query Me{
  me {
    id
    email
  }
}
`;

function Home() {
  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Not authenticated...</div>;
  }

  return (
    <div>
      Home page
      <br />
      {data.me.id} - {data.me.email}      
    </div>
  );
}

export default Home;
