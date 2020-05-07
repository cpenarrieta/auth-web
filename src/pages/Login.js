import React, { useState } from "react";
import { useMutation } from "graphql-hooks";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "../acessToken";

const LOGIN_MUTATION = `
mutation Login(
  $email: String!
  $password: String!
) {
  login(
    user: {
      email: $email
      password: $password
    }
  ) {
    accessToken
  }
}
`;

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN_MUTATION);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await login({
          variables: {
            email,
            password,
          },
        });

        if (response?.data?.login?.accessToken) {
          setAccessToken(response.data.login.accessToken);
          history.push("/");
        }
      }}
    >
      <div>
        <input
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;
